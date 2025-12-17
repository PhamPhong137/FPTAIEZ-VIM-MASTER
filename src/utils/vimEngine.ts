import { GameState, VimMode, Cursor } from '../types';

const SPECIAL_KEYS = ['Backspace', 'Enter', 'Escape', 'Tab'];

export const createInitialState = (text: string[]): GameState => ({
  lines: [...text],
  cursor: { row: 0, col: 0 },
  visualStart: null,
  mode: VimMode.NORMAL,
  commandBuffer: '',
  commandLine: '',
  statusMessage: '',
  history: [],
  future: [],
  searchQuery: '',
  clipboard: null,
  lastSearchDirection: 'forward',
  recentKeys: []
});

// Helper to constrain cursor
const clampCursor = (lines: string[], cursor: Cursor): Cursor => {
  const row = Math.max(0, Math.min(lines.length - 1, cursor.row));
  const lineLen = lines[row]?.length || 0;
  const col = Math.max(0, Math.min(lineLen > 0 ? lineLen - 1 : 0, cursor.col));
  return { row, col };
};

// Helper for history
const pushHistory = (state: GameState): GameState => {
  const newHistory = [...state.history, { lines: [...state.lines], cursor: { ...state.cursor } }];
  // Limit history size
  if (newHistory.length > 50) newHistory.shift();
  return { ...state, history: newHistory, future: [] };
};

const handleMotion = (state: GameState, key: string, count: number): Partial<GameState> => {
  let { row, col } = state.cursor;
  const lines = state.lines;

  for (let i = 0; i < count; i++) {
    switch (key) {
      case 'h': col = Math.max(0, col - 1); break;
      case 'l': col = Math.min(lines[row].length - 1, col + 1); break;
      case 'j': row = Math.min(lines.length - 1, row + 1); col = Math.min(col, Math.max(0, lines[row].length - 1)); break;
      case 'k': row = Math.max(0, row - 1); col = Math.min(col, Math.max(0, lines[row].length - 1)); break;
      case 'w': {
        // Simple word jump
        let currentRow = lines[row];
        let remaining = currentRow.slice(col + 1);
        const nextSpace = remaining.search(/\s/);
        
        if (nextSpace !== -1) {
            const afterSpace = remaining.slice(nextSpace);
            const nextWord = afterSpace.search(/\S/);
            if (nextWord !== -1) {
                col += nextSpace + nextWord + 1;
            } else {
                if (row < lines.length - 1) {
                    row++;
                    const nextLineStart = lines[row].search(/\S/);
                    col = nextLineStart === -1 ? 0 : nextLineStart;
                }
            }
        } else {
             if (row < lines.length - 1) {
                row++;
                const nextLineStart = lines[row].search(/\S/);
                col = nextLineStart === -1 ? 0 : nextLineStart;
            } else {
                col = lines[row].length - 1;
            }
        }
        break;
      }
      case 'b': {
        if (col === 0) {
            if (row > 0) {
                row--;
                col = lines[row].length - 1;
            }
        } else {
             let c = col - 1;
             while (c > 0 && /\s/.test(lines[row][c])) c--; 
             while (c > 0 && /\S/.test(lines[row][c])) c--; 
             if (/\s/.test(lines[row][c])) c++; 
             col = c;
        }
        break;
      }
      case 'e': {
        let currentRow = lines[row];
        let idx = col + 1;
        if (idx >= currentRow.length) {
             if (row < lines.length - 1) {
                 row++;
                 col = 0;
                 currentRow = lines[row];
                 idx = 0;
             }
        }
        while(idx < currentRow.length && /\S/.test(currentRow[idx])) idx++;
        if (idx > 0) col = idx - 1;
        else col = 0;
        
        if (/\s/.test(lines[row][col])) {
             let c = col;
             while(c < lines[row].length && /\s/.test(lines[row][c])) c++;
             while(c < lines[row].length && /\S/.test(lines[row][c])) c++;
             col = c - 1;
        }
        break;
      }
      case '0': col = 0; break;
      case '$': col = Math.max(0, lines[row].length - 1); break;
      case 'gg': row = 0; col = 0; break;
      case 'G': row = lines.length - 1; col = Math.max(0, lines[row].length - 1); break;
      case '%': {
        const line = lines[row];
        const char = line[col];
        const pairs: Record<string, string> = { '{': '}', '[': ']', '(': ')', '}': '{', ']': '[', ')': '(' };
        if (pairs[char]) {
           const target = pairs[char];
           const direction = ['{', '[', '('].includes(char) ? 1 : -1;
           let depth = 0;
           let r = row;
           let c = col;
           while (r >= 0 && r < lines.length) {
               c += direction;
               if (c < 0) { r--; if (r>=0) c = lines[r].length - 1; }
               else if (c >= lines[r].length) { r++; c = -1; }
               else {
                   const curr = lines[r][c];
                   if (curr === char) depth++;
                   if (curr === target) {
                       if (depth === 0) {
                           row = r;
                           col = c;
                           break;
                       }
                       depth--;
                   }
               }
           }
        }
        break;
      }
    }
  }

  return { cursor: clampCursor(lines, { row, col }) };
};

const performDelete = (state: GameState, motion: string, count: number): GameState => {
  const s = pushHistory(state);
  const lines = [...s.lines];
  let { row, col } = s.cursor;

  if (motion === 'd') { // 'dd'
    const delCount = count || 1;
    // Save to clipboard (linewise)
    s.clipboard = lines.slice(row, row + delCount).join('\n');
    lines.splice(row, delCount);
    if (lines.length === 0) lines.push("");
    row = Math.min(row, lines.length - 1);
    col = 0;
    return { ...s, lines, cursor: clampCursor(lines, { row, col }), commandBuffer: '', clipboard: s.clipboard };
  } else if (motion === 'w') { // 'dw'
    let line = lines[row];
    let remainder = line.slice(col);
    const nextSpace = remainder.search(/\s/);
    let cutLen = 0;
    if (nextSpace === -1) {
        cutLen = remainder.length;
    } else {
        let afterWord = remainder.slice(nextSpace);
        const nextWordStart = afterWord.search(/\S/);
        if (nextWordStart === -1) cutLen = remainder.length;
        else cutLen = nextSpace + nextWordStart;
    }
    const cutText = line.slice(col, col + cutLen);
    s.clipboard = cutText; // Simple clipboard
    lines[row] = line.slice(0, col) + line.slice(col + cutLen);
    return { ...s, lines, cursor: clampCursor(lines, {row, col}), commandBuffer: '', clipboard: s.clipboard };
  }
  
  return { ...state, commandBuffer: '' };
};

const performVisualOp = (state: GameState, op: 'd' | 'y' | 'c'): GameState => {
    if (!state.visualStart) return state;
    const s = pushHistory(state);
    const lines = [...s.lines];
    
    // Determine range
    let r1 = state.visualStart.row;
    let c1 = state.visualStart.col;
    let r2 = state.cursor.row;
    let c2 = state.cursor.col;

    if (r1 > r2 || (r1 === r2 && c1 > c2)) {
        [r1, r2] = [r2, r1];
        [c1, c2] = [c2, c1];
    }
    
    // Simplified: Works best on single line for this demo engine, or simple multiline delete
    // Implementing proper block visual mode is complex, let's do characterwise stream
    
    let textYanked = "";
    
    if (r1 === r2) {
        const line = lines[r1];
        const minC = Math.min(c1, c2);
        const maxC = Math.max(c1, c2);
        textYanked = line.slice(minC, maxC + 1);
        
        if (op === 'y') {
            return { ...state, mode: VimMode.NORMAL, visualStart: null, clipboard: textYanked, statusMessage: "Yanked selection" };
        }
        
        // Delete
        lines[r1] = line.slice(0, minC) + line.slice(maxC + 1);
        const newCursor = { row: r1, col: minC };
        
        if (op === 'c') {
            return { ...s, lines, cursor: newCursor, mode: VimMode.INSERT, visualStart: null, clipboard: textYanked, statusMessage: "-- INSERT --" };
        }
        
        return { ...s, lines, cursor: newCursor, mode: VimMode.NORMAL, visualStart: null, clipboard: textYanked };
    } else {
        // Multi-line visual operation
        // Delete everything between start and end
        // First line: delete from c1 to end
        // Middle lines: delete
        // Last line: delete from 0 to c2
        // Join first and last remainder
        
        if (op === 'y') {
            // Complex yank
            textYanked = "Multiline yank"; 
            return { ...state, mode: VimMode.NORMAL, visualStart: null, clipboard: textYanked, statusMessage: "Yanked multiline" };
        }

        const firstLineRem = lines[r1].slice(0, c1);
        const lastLineRem = lines[r2].slice(c2 + 1);
        lines.splice(r1, r2 - r1 + 1, firstLineRem + lastLineRem);
        
        return { ...s, lines, cursor: {row: r1, col: c1}, mode: op === 'c' ? VimMode.INSERT : VimMode.NORMAL, visualStart: null };
    }
};

const updateRecentKeys = (state: GameState, key: string): string[] => {
    let displayKey = key;
    if (key === 'Escape') displayKey = 'Esc';
    if (key === 'Enter') displayKey = '↵';
    if (key === 'Backspace') displayKey = '⌫';
    if (key === ' ') displayKey = '␣';
    
    const newKeys = [...state.recentKeys, displayKey];
    if (newKeys.length > 5) newKeys.shift();
    return newKeys;
};

export const processKey = (state: GameState, key: string, ctrlKey: boolean): GameState => {
  const recentKeys = updateRecentKeys(state, key);
  let nextState = { ...state, recentKeys };

  // Global Shortcuts
  if (ctrlKey && key === 'r') {
    if (state.future.length > 0) {
      const next = state.future[state.future.length - 1];
      const newFuture = state.future.slice(0, -1);
      return {
        ...nextState,
        lines: next.lines,
        cursor: next.cursor,
        history: [...state.history, { lines: state.lines, cursor: state.cursor }],
        future: newFuture,
        statusMessage: 'Redo'
      };
    }
    return { ...nextState, statusMessage: 'Already at newest change' };
  }
  
  // Visual Mode Handling
  if (state.mode === VimMode.VISUAL) {
      if (key === 'Escape') {
          return { ...nextState, mode: VimMode.NORMAL, visualStart: null, statusMessage: '' };
      }
      if (['d', 'x'].includes(key)) return performVisualOp(nextState, 'd');
      if (key === 'y') return performVisualOp(nextState, 'y');
      if (key === 'c') return performVisualOp(nextState, 'c');
      
      // Motions in visual mode
      const motionKeys = ['h', 'j', 'k', 'l', 'w', 'b', 'e', '0', '$', 'G', '%'];
      if (motionKeys.includes(key)) {
           const moved = handleMotion(nextState, key, 1);
           return { ...nextState, ...moved };
      }
      return nextState;
  }

  // INSERT MODE
  if (state.mode === VimMode.INSERT) {
    if (key === 'Escape') {
      const newCol = Math.max(0, state.cursor.col - 1);
      return { ...nextState, mode: VimMode.NORMAL, cursor: { ...state.cursor, col: newCol }, statusMessage: '-- NORMAL --' };
    }
    
    if (key.length === 1 || key === 'Enter' || key === 'Backspace' || key === 'Tab') {
      const s = nextState; 
      const lines = [...s.lines];
      const { row, col } = s.cursor;
      
      if (key === 'Enter') {
        const line = lines[row];
        const indent = line.match(/^\s*/)?.[0] || '';
        const prevLine = line.slice(0, col);
        const nextLine = indent + line.slice(col);
        lines[row] = prevLine;
        lines.splice(row + 1, 0, nextLine);
        return { ...s, lines, cursor: { row: row + 1, col: indent.length } };
      } else if (key === 'Backspace') {
        if (col > 0) {
          const line = lines[row];
          lines[row] = line.slice(0, col - 1) + line.slice(col);
          return { ...s, lines, cursor: { row, col: col - 1 } };
        } else if (row > 0) {
          const prevLen = lines[row - 1].length;
          lines[row - 1] += lines[row];
          lines.splice(row, 1);
          return { ...s, lines, cursor: { row: row - 1, col: prevLen } };
        }
      } else if (key === 'Tab') {
         const line = lines[row];
         lines[row] = line.slice(0, col) + '  ' + line.slice(col);
         return { ...s, lines, cursor: { row, col: col + 2 } };
      } else {
        const line = lines[row];
        lines[row] = line.slice(0, col) + key + line.slice(col);
        return { ...s, lines, cursor: { row, col: col + 1 } };
      }
    }
    return nextState;
  }

  // COMMAND MODE
  if (state.mode === VimMode.COMMAND) {
    if (key === 'Escape') return { ...nextState, mode: VimMode.NORMAL, commandLine: '', statusMessage: '' };
    if (key === 'Enter') {
      const cmd = state.commandLine;
      const type = cmd[0];
      const content = cmd.slice(1);
      
      if (type === ':') {
        if (content === 'q' || content === 'wq') {
           return { ...nextState, mode: VimMode.NORMAL, commandLine: '', statusMessage: 'Vim session closed (fake)' };
        }
      } else if (type === '/') {
         return performSearch(nextState, content, 'forward');
      } else if (type === '?') {
         return performSearch(nextState, content, 'backward');
      }
      return { ...nextState, mode: VimMode.NORMAL, commandLine: '', statusMessage: '' };
    }
    if (key === 'Backspace') return { ...nextState, commandLine: state.commandLine.slice(0, -1) };
    else if (key.length === 1) return { ...nextState, commandLine: state.commandLine + key };
    return nextState;
  }

  if (key === 'Escape') return { ...nextState, commandBuffer: '', statusMessage: '' };

  let buffer = state.commandBuffer + key;
  if (/\d/.test(key) && buffer !== '0') return { ...nextState, commandBuffer: buffer };
  
  const countMatch = buffer.match(/^(\d+)/);
  const count = countMatch ? parseInt(countMatch[0]) : 1;
  const cmdWithoutCount = buffer.replace(/^(\d+)/, '');
  
  // Single Key Commands
  if (cmdWithoutCount === 'u') {
     if (state.history.length > 0) {
       const prev = state.history[state.history.length - 1];
       const newHistory = state.history.slice(0, -1);
       return { ...nextState, lines: prev.lines, cursor: prev.cursor, history: newHistory, future: [...state.future, { lines: state.lines, cursor: state.cursor }], statusMessage: 'Undo', commandBuffer: '' };
     }
     return { ...nextState, statusMessage: 'Already at oldest change', commandBuffer: '' };
  }
  
  // Enter Visual Mode
  if (cmdWithoutCount === 'v') {
      return { ...nextState, mode: VimMode.VISUAL, visualStart: { ...state.cursor }, statusMessage: '-- VISUAL --', commandBuffer: '' };
  }

  if (cmdWithoutCount === 'i') return { ...pushHistory(nextState), mode: VimMode.INSERT, statusMessage: '-- INSERT --', commandBuffer: '' };
  if (cmdWithoutCount === 'a') {
     const newCol = Math.min(state.lines[state.cursor.row].length, state.cursor.col + 1);
     return { ...pushHistory(nextState), mode: VimMode.INSERT, cursor: { ...state.cursor, col: newCol }, statusMessage: '-- INSERT --', commandBuffer: '' };
  }
  if (cmdWithoutCount === 'A') {
     const newCol = state.lines[state.cursor.row].length;
     return { ...pushHistory(nextState), mode: VimMode.INSERT, cursor: { ...state.cursor, col: newCol }, statusMessage: '-- INSERT --', commandBuffer: '' };
  }
  if (cmdWithoutCount === 'o') {
     const s = pushHistory(nextState);
     const lines = [...s.lines];
     lines.splice(s.cursor.row + 1, 0, "");
     return { ...s, lines, cursor: { row: s.cursor.row + 1, col: 0 }, mode: VimMode.INSERT, statusMessage: '-- INSERT --', commandBuffer: '' };
  }
  if (cmdWithoutCount === 'O') {
     const s = pushHistory(nextState);
     const lines = [...s.lines];
     lines.splice(s.cursor.row, 0, "");
     return { ...s, lines, cursor: { row: s.cursor.row, col: 0 }, mode: VimMode.INSERT, statusMessage: '-- INSERT --', commandBuffer: '' };
  }
  if (cmdWithoutCount === 'x') {
      const s = pushHistory(nextState);
      const lines = [...s.lines];
      const line = lines[s.cursor.row];
      let newCol = s.cursor.col;
      if (line.length > 0) {
         // Save to clipboard for x
         s.clipboard = line[s.cursor.col];
         lines[s.cursor.row] = line.slice(0, s.cursor.col) + line.slice(s.cursor.col + count);
         newCol = Math.min(newCol, Math.max(0, lines[s.cursor.row].length - 1));
      }
      return { ...s, lines, cursor: { ...s.cursor, col: newCol }, commandBuffer: '' };
  }
  if (cmdWithoutCount === 'J') {
      const s = pushHistory(nextState);
      const lines = [...s.lines];
      if (s.cursor.row < lines.length - 1) {
          const nextLine = lines[s.cursor.row + 1].trim();
          lines[s.cursor.row] = lines[s.cursor.row] + " " + nextLine;
          lines.splice(s.cursor.row + 1, 1);
          return { ...s, lines, commandBuffer: '' };
      }
  }

  // Pending commands: f, r
  if (cmdWithoutCount === 'f') return { ...nextState, commandBuffer: buffer };
  if (cmdWithoutCount.startsWith('f') && cmdWithoutCount.length === 2) {
      const char = cmdWithoutCount[1];
      const line = state.lines[state.cursor.row];
      const idx = line.indexOf(char, state.cursor.col + 1);
      if (idx !== -1) {
          return { ...nextState, cursor: { ...state.cursor, col: idx }, commandBuffer: '' };
      }
      return { ...nextState, commandBuffer: '' };
  }

  if (cmdWithoutCount === 'r') return { ...nextState, commandBuffer: buffer };
  if (cmdWithoutCount.startsWith('r') && cmdWithoutCount.length === 2) {
      const char = cmdWithoutCount[1];
      const s = pushHistory(nextState);
      const lines = [...s.lines];
      const line = lines[s.cursor.row];
      if (line.length > s.cursor.col) {
        lines[s.cursor.row] = line.slice(0, s.cursor.col) + char + line.slice(s.cursor.col + 1);
      }
      return { ...s, lines, commandBuffer: '' };
  }

  // Yank / Paste
  if (cmdWithoutCount === 'yy') {
      const line = state.lines[state.cursor.row];
      return { ...nextState, clipboard: line, statusMessage: 'Line yanked', commandBuffer: '' };
  }
  if (cmdWithoutCount === 'p') {
      if (state.clipboard) {
          const s = pushHistory(nextState);
          const lines = [...s.lines];
          // Determine if linewise (simple check: if multiline or set flag, but here assume string)
          // For 'yy' we stored line string. We'll paste as new line.
          // For visual char yank, we might want inline.
          // Simplify: Always paste as new line for now unless we track type.
          lines.splice(s.cursor.row + 1, 0, state.clipboard);
          return { ...s, lines, cursor: { row: s.cursor.row + 1, col: 0 }, commandBuffer: '' };
      }
  }

  if (cmdWithoutCount === 'n') return performSearch(nextState, state.searchQuery, state.lastSearchDirection);
  if (cmdWithoutCount === 'N') return performSearch(nextState, state.searchQuery, state.lastSearchDirection === 'forward' ? 'backward' : 'forward');

  // Motions
  const motionKeys = ['h', 'j', 'k', 'l', 'w', 'b', 'e', '0', '$', 'G', '%'];
  if (motionKeys.includes(cmdWithoutCount)) {
     const newState = handleMotion(nextState, cmdWithoutCount, count);
     return { ...nextState, ...newState, commandBuffer: '' };
  }
  if (cmdWithoutCount === 'gg') {
     const newState = handleMotion(nextState, 'gg', count); 
     return { ...nextState, ...newState, commandBuffer: '' };
  }

  // Operators
  if (cmdWithoutCount === 'dd') return performDelete(nextState, 'd', count);
  if (cmdWithoutCount === 'dw') return performDelete(nextState, 'w', count);
  if (cmdWithoutCount === 'cw') {
      const s = performDelete(nextState, 'w', count);
      return { ...s, mode: VimMode.INSERT, statusMessage: '-- INSERT --' };
  }
  if (cmdWithoutCount === 'D') {
      const s = pushHistory(nextState);
      const lines = [...s.lines];
      const line = lines[s.cursor.row];
      s.clipboard = line.slice(s.cursor.col);
      lines[s.cursor.row] = line.slice(0, s.cursor.col);
      return { ...s, lines, cursor: { ...s.cursor, col: Math.max(0, s.cursor.col - 1) }, commandBuffer: '' };
  }
  
  if (key === ':') return { ...nextState, mode: VimMode.COMMAND, commandLine: ':', commandBuffer: '' };
  if (key === '/') return { ...nextState, mode: VimMode.COMMAND, commandLine: '/', commandBuffer: '' };
  if (key === '?') return { ...nextState, mode: VimMode.COMMAND, commandLine: '?', commandBuffer: '' };

  if (/^\d+$/.test(buffer)) return { ...nextState, commandBuffer: buffer };
  if (['g', 'd', 'c', 'y', 'r', 'f'].includes(buffer.replace(/^\d+/, ''))) return { ...nextState, commandBuffer: buffer };

  return { ...nextState, commandBuffer: '' };
};

const performSearch = (state: GameState, query: string, direction: 'forward' | 'backward'): GameState => {
    if (!query) return state;
    const lines = state.lines;
    let { row, col } = state.cursor;
    let found = false;
    let nextRow = row;
    let nextCol = col;
    
    // ... (Use existing simple search logic or optimized one) ...
    // Reusing exact logic from previous block for brevity in diff, assume unchanged logic just placed here
    if (direction === 'forward') {
        let match = lines[row].slice(col + 1).indexOf(query);
        if (match !== -1) { nextCol = col + 1 + match; found = true; }
        else {
            for (let r = row + 1; r < lines.length; r++) {
                match = lines[r].indexOf(query);
                if (match !== -1) { nextRow = r; nextCol = match; found = true; break; }
            }
            if (!found) {
                 for (let r = 0; r <= row; r++) {
                     let match = lines[r].indexOf(query); 
                     if (match !== -1 && (r < row || match < col)) { nextRow = r; nextCol = match; found = true; break; }
                 }
            }
        }
    } else {
        let match = lines[row].slice(0, col).lastIndexOf(query);
        if (match !== -1) { nextCol = match; found = true; }
        else {
            for (let r = row - 1; r >= 0; r--) {
                match = lines[r].lastIndexOf(query);
                if (match !== -1) { nextRow = r; nextCol = match; found = true; break; }
            }
             if (!found) {
                 for (let r = lines.length - 1; r >= row; r--) {
                     match = lines[r].lastIndexOf(query);
                     if (match !== -1) { if (r > row || (r === row && match > col)) { nextRow = r; nextCol = match; found = true; break; } }
                 }
            }
        }
    }
    
    if (found) return { ...state, cursor: { row: nextRow, col: nextCol }, mode: VimMode.NORMAL, commandLine: '', searchQuery: query, lastSearchDirection: direction, statusMessage: `Found "${query}"` };
    else return { ...state, mode: VimMode.NORMAL, commandLine: '', statusMessage: `Pattern not found: ${query}` };
};