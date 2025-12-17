import React, { useEffect, useRef } from 'react';
import { GameState, VimMode } from '../types';

interface VimEditorProps {
  state: GameState;
  onKeyDown: (e: KeyboardEvent) => void;
  isFocused: boolean;
  onFocus: () => void;
}

export const VimEditor: React.FC<VimEditorProps> = ({ state, onKeyDown, isFocused, onFocus }) => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFocused && editorRef.current) {
      editorRef.current.focus();
    }
  }, [isFocused]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
       if (!isFocused) return;
       if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'Backspace'].includes(e.key)) {
           e.preventDefault();
       }
       onKeyDown(e);
    };
    
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onKeyDown, isFocused]);

  const modeColors = {
      [VimMode.NORMAL]: 'bg-blue-600',
      [VimMode.INSERT]: 'bg-green-600',
      [VimMode.VISUAL]: 'bg-purple-600',
      [VimMode.COMMAND]: 'bg-gray-600'
  };

  // Helper to check if char is in visual selection
  const isInVisualSelection = (r: number, c: number) => {
      if (state.mode !== VimMode.VISUAL || !state.visualStart) return false;
      let r1 = state.visualStart.row;
      let c1 = state.visualStart.col;
      let r2 = state.cursor.row;
      let c2 = state.cursor.col;
      
      if (r1 > r2 || (r1 === r2 && c1 > c2)) {
          [r1, r2] = [r2, r1];
          [c1, c2] = [c2, c1];
      }

      if (r < r1 || r > r2) return false;
      if (r > r1 && r < r2) return true;
      if (r1 === r2) return c >= c1 && c <= c2;
      if (r === r1) return c >= c1;
      if (r === r2) return c <= c2;
      return false;
  };

  return (
    <div 
      className="flex flex-col h-full bg-[#1e1e1e] text-[#d4d4d4] font-mono border-l border-[#1a1a1a] outline-none"
      onClick={onFocus}
      ref={editorRef}
      tabIndex={0}
    >
      <div className="flex-grow overflow-auto relative p-6 pt-8">
        {state.lines.map((line, rowIndex) => (
          <div key={rowIndex} className="whitespace-pre min-h-[1.5em] leading-7 relative font-medium">
             <span className="absolute left-0 text-gray-600 select-none w-8 text-right pr-4 text-sm font-light opacity-40">{rowIndex + 1}</span>
             <span className="pl-12 block">
               {line.length === 0 && rowIndex === state.cursor.row ? (
                 <span className={`inline-block w-[1ch] h-[1.2em] align-text-bottom ${state.mode === VimMode.INSERT ? 'border-l-2 border-green-500 animate-pulse' : 'bg-gray-400 opacity-70'}`}>&nbsp;</span>
               ) : (
                  line.split('').map((char, colIndex) => {
                    const isCursor = state.cursor.row === rowIndex && state.cursor.col === colIndex;
                    const isSelected = isInVisualSelection(rowIndex, colIndex);
                    
                    let colorClass = 'text-[#d4d4d4]';
                    if (line.trim().startsWith('//')) colorClass = 'text-gray-500 italic';
                    else {
                        if (char === '{' || char === '}' || char === '(' || char === ')') colorClass = 'text-yellow-400';
                        if (char === '"' || char === "'") colorClass = 'text-green-400';
                    }

                    return (
                      <span 
                        key={colIndex} 
                        className={`
                            ${isCursor && state.mode !== VimMode.INSERT ? 'bg-[#569cd6] text-white' : ''}
                            ${isCursor && state.mode === VimMode.INSERT ? 'border-l-2 border-green-500' : ''}
                            ${isSelected && !isCursor ? 'bg-blue-500/40' : ''}
                            ${colorClass}
                        `}
                      >
                        {char}
                      </span>
                    );
                  })
               )}
               {state.cursor.row === rowIndex && state.cursor.col === line.length && (
                 <span className={`inline-block w-[1ch] h-[1.2em] align-middle ${state.mode === VimMode.INSERT ? 'border-l-2 border-green-500' : 'bg-[#569cd6] opacity-80'}`}>&nbsp;</span>
               )}
             </span>
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-12 right-6 flex gap-2 pointer-events-none">
          {state.recentKeys.slice(-3).map((k, i) => (
              <div key={i} className="bg-[#3a3a3a] text-gray-300 border border-[#4a4a4a] w-10 h-10 flex items-center justify-center rounded-lg shadow-xl font-bold text-lg animate-fade-in opacity-90">
                  {k}
              </div>
          ))}
          {state.commandBuffer && (
             <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white w-10 h-10 flex items-center justify-center rounded-lg shadow-xl font-bold text-lg animate-pulse">
                 {state.commandBuffer}
             </div>
          )}
      </div>

      <div className="h-7 bg-[#2d2d2d] flex items-stretch text-xs font-medium text-white select-none border-t border-[#1a1a1a]">
        <div className={`px-4 flex items-center ${modeColors[state.mode] || 'bg-blue-600'} text-white font-semibold`}>
            {state.mode}
        </div>
        <div className="bg-[#2d2d2d] px-3 flex items-center text-gray-400 gap-2 border-r border-[#1a1a1a]">
             <span className="text-gray-500">📄</span> cleanup.js
        </div>
        <div className="bg-[#2d2d2d] px-3 flex items-center text-gray-400 border-r border-[#1a1a1a]">
             javascript
        </div>
        <div className="bg-[#2d2d2d] px-3 flex items-center text-gray-500 flex-grow">
            {state.statusMessage}
        </div>
         <div className="bg-[#2d2d2d] px-4 flex items-center text-gray-400 gap-4 min-w-[150px] justify-end">
            <span>utf-8</span>
            <span>{Math.round((state.cursor.row / Math.max(1, state.lines.length - 1)) * 100)}%</span>
            <span>ln {state.cursor.row + 1}:{state.cursor.col + 1}</span>
        </div>
      </div>
    </div>
  );
};