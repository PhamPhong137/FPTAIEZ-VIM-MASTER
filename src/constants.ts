import { Level } from './types';

export const LEVELS: Level[] = [
  {
    id: 1,
    title: "Basic Movement",
    description: "Efficiency is key in Vim. Instead of using arrows, keep your fingers on the home row.",
    initialText: [
      "Welcome to VIM Master.",
      "Your journey begins here.",
      "Move the cursor to the 'X' below.",
      "",
      "        X"
    ],
    initialCursor: { row: 0, col: 0 },
    goalType: 'CURSOR',
    targetCursor: { row: 4, col: 8 },
    hint: "Use h, j, k, l to navigate.",
    availableCommands: [
        { key: 'h', description: 'Move left' },
        { key: 'j', description: 'Move down' },
        { key: 'k', description: 'Move up' },
        { key: 'l', description: 'Move right' },
    ]
  },
  {
    id: 2,
    title: "Word Movement",
    description: "Jumping character by character is slow. Use word motions to move faster.",
    initialText: [
      "Jump between words efficiently.",
      "Go to the start of the last word."
    ],
    initialCursor: { row: 0, col: 0 },
    goalType: 'CURSOR',
    targetCursor: { row: 1, col: 26 }, // "word."
    hint: "w jumps to start of next word. e jumps to end.",
    availableCommands: [
        { key: 'w', description: 'Next word start' },
        { key: 'e', description: 'Next word end' },
        { key: 'b', description: 'Back word' },
    ]
  },
  {
    id: 3,
    title: "Line Jumps",
    description: "Navigate strictly to the start or end of lines or the document.",
    initialText: [
      "Start here.",
      "Line 2",
      "Line 3",
      "Line 4",
      "Go to the end of this line ->"
    ],
    initialCursor: { row: 0, col: 0 },
    goalType: 'CURSOR',
    targetCursor: { row: 4, col: 28 },
    hint: "G goes to bottom. $ goes to end of line.",
    availableCommands: [
        { key: '0', description: 'Start of line' },
        { key: '$', description: 'End of line' },
        { key: 'gg', description: 'Start of file' },
        { key: 'G', description: 'End of file' },
    ]
  },
  {
    id: 4,
    title: "Insert Mode",
    description: "Press 'i' to insert text. Type 'VIM'. Press Esc to exit.",
    initialText: [
      "Make this line say: I love VIM",
      "I love "
    ],
    initialCursor: { row: 1, col: 7 },
    goalType: 'TEXT',
    targetText: [
      "Make this line say: I love VIM",
      "I love VIM"
    ],
    hint: "i enters insert mode. Esc exits.",
    availableCommands: [
        { key: 'i', description: 'Insert mode' },
        { key: 'Esc', description: 'Normal mode' },
    ]
  },
  {
    id: 5,
    title: "Deleting Lines",
    description: "Efficiency is key in Vim. Instead of deleting characters one by one with backspace, you can remove entire lines instantly using command mode.",
    initialText: [
      "function cleanupData(data) {",
      "  // Initialize result array",
      "  const result = [];",
      "  for (let i = 0; i < data.length; i++) {",
      "    // processing items...",
      "    // ERROR: This line is deprecated and should be deleted",
      "    // ERROR: This line causes a memory leak, delete it",
      "    if (data[i].isValid) {",
      "      result.push(data[i]);",
      "    }",
      "  }",
      "  return result;",
      "}"
    ],
    initialCursor: { row: 0, col: 0 },
    goalType: 'TEXT',
    targetText: [
        "function cleanupData(data) {",
        "  // Initialize result array",
        "  const result = [];",
        "  for (let i = 0; i < data.length; i++) {",
        "    // processing items...",
        "    if (data[i].isValid) {",
        "      result.push(data[i]);",
        "    }",
        "  }",
        "  return result;",
        "}"
    ],
    hint: "Move to lines with comments marked ERROR and use dd to remove them.",
    availableCommands: [
        { key: 'dd', description: 'Delete current line' },
        { key: 'j', description: 'Move down' },
        { key: 'k', description: 'Move up' },
    ]
  },
  {
    id: 6,
    title: "Change Text",
    description: "cw changes a word (delete + insert).",
    initialText: [
      "Change 'bad' to 'good'.",
      "Vim is bad."
    ],
    initialCursor: { row: 1, col: 7 },
    goalType: 'TEXT',
    targetText: [
      "Change 'bad' to 'good'.",
      "Vim is good."
    ],
    hint: "Move to 'b', type cw, type 'good', press Esc.",
    availableCommands: [
        { key: 'cw', description: 'Change word' },
        { key: 'w', description: 'Move word' },
    ]
  },
  {
    id: 7,
    title: "Undo / Redo",
    description: "u to Undo, Ctrl+r to Redo.",
    initialText: [
      "Delete this line.",
      "Then undo it."
    ],
    initialCursor: { row: 0, col: 0 },
    goalType: 'TEXT',
    targetText: [
      "Delete this line.",
      "Then undo it."
    ],
    hint: "dd to delete, then u to bring it back.",
    availableCommands: [
        { key: 'u', description: 'Undo' },
        { key: 'Ctrl+r', description: 'Redo' },
        { key: 'dd', description: 'Delete line' },
    ]
  },
  {
    id: 8,
    title: "Searching",
    description: "Type /keyword to search forward. n for next.",
    initialText: [
      "Find the needle in the haystack.",
      "Hay",
      "Hay",
      "needle",
      "Hay"
    ],
    initialCursor: { row: 0, col: 0 },
    goalType: 'CURSOR',
    targetCursor: { row: 3, col: 0 },
    hint: "Type /needle then Enter.",
    availableCommands: [
        { key: '/', description: 'Search' },
        { key: 'n', description: 'Next match' },
        { key: 'N', description: 'Prev match' },
    ]
  },
  {
    id: 9,
    title: "Append at End",
    description: "Often you need to add text to the end of a line. 'A' does this in one stroke.",
    initialText: [
      "Complete this sentence.",
      "Vim is power"
    ],
    initialCursor: { row: 1, col: 0 },
    goalType: 'TEXT',
    targetText: [
      "Complete this sentence.",
      "Vim is powerful"
    ],
    hint: "Press 'A' to jump to end and insert. Type 'ful'. Esc.",
    availableCommands: [
        { key: 'A', description: 'Append at EOL' },
        { key: 'a', description: 'Append after' },
    ]
  },
  {
    id: 10,
    title: "Open New Lines",
    description: "Use 'o' to open a line below, 'O' to open a line above.",
    initialText: [
      "Line 1",
      "Line 3"
    ],
    initialCursor: { row: 0, col: 0 },
    goalType: 'TEXT',
    targetText: [
      "Line 1",
      "Line 2",
      "Line 3"
    ],
    hint: "Move to Line 1, press 'o', type 'Line 2'.",
    availableCommands: [
        { key: 'o', description: 'Open below' },
        { key: 'O', description: 'Open above' },
    ]
  },
  {
    id: 11,
    title: "Fixing Typos",
    description: "The 'x' command deletes the character under the cursor.",
    initialText: [
      "Helllo World",
      "Fixx the typos."
    ],
    initialCursor: { row: 0, col: 0 },
    goalType: 'TEXT',
    targetText: [
      "Hello World",
      "Fix the typos."
    ],
    hint: "Navigate to the extra letters and press 'x'.",
    availableCommands: [
        { key: 'x', description: 'Delete char' },
        { key: 'h/l', description: 'Move' },
    ]
  },
  {
    id: 12,
    title: "Delete to End",
    description: "Capital 'D' deletes from the cursor to the end of the line.",
    initialText: [
      "Keep this part. Delete this part.",
      "Short."
    ],
    initialCursor: { row: 0, col: 15 },
    goalType: 'TEXT',
    targetText: [
      "Keep this part. ",
      "Short."
    ],
    hint: "Move to 'D' of Delete, press 'D'.",
    availableCommands: [
        { key: 'D', description: 'Delete to EOL' },
    ]
  },
  {
    id: 13,
    title: "Yank and Put",
    description: "'yy' copies (yanks) a line. 'p' pastes (puts) it.",
    initialText: [
      "Duplicate me.",
      "Just once."
    ],
    initialCursor: { row: 0, col: 0 },
    goalType: 'TEXT',
    targetText: [
      "Duplicate me.",
      "Duplicate me.",
      "Just once."
    ],
    hint: "Press 'yy' on the first line, then 'p' to paste below.",
    availableCommands: [
        { key: 'yy', description: 'Yank line' },
        { key: 'p', description: 'Paste below' },
    ]
  },
  {
    id: 14,
    title: "Visual Mode",
    description: "Press 'v' to enter Visual mode. Move to select. Press 'd' to delete selection.",
    initialText: [
      "Delete [this block] of text.",
      "Keep the rest."
    ],
    initialCursor: { row: 0, col: 7 },
    goalType: 'TEXT',
    targetText: [
      "Delete  of text.",
      "Keep the rest."
    ],
    hint: "Move to '[', press 'v', move to ']', press 'd'.",
    availableCommands: [
        { key: 'v', description: 'Visual Mode' },
        { key: 'd', description: 'Delete selection' },
    ]
  },
  {
    id: 15,
    title: "Visual Yank",
    description: "Select text with 'v', copy with 'y', paste with 'p'.",
    initialText: [
      "Copy this: SECRET",
      "Paste here: "
    ],
    initialCursor: { row: 0, col: 11 },
    goalType: 'TEXT',
    targetText: [
      "Copy this: SECRET",
      "Paste here: SECRET"
    ],
    hint: "Select 'SECRET' with 'v', yank with 'y', move to end, paste 'p'.",
    availableCommands: [
        { key: 'v', description: 'Visual Mode' },
        { key: 'y', description: 'Yank selection' },
        { key: 'p', description: 'Paste' },
    ]
  },
  {
    id: 16,
    title: "Find Character",
    description: "Use 'f' followed by a character to jump to the next occurrence on the line.",
    initialText: [
      "Jump to the z in this line.",
      "The zebra is far away."
    ],
    initialCursor: { row: 1, col: 0 },
    goalType: 'CURSOR',
    targetCursor: { row: 1, col: 4 }, // index of z
    hint: "Press 'fz' to jump directly to z.",
    availableCommands: [
        { key: 'f{char}', description: 'Find char' },
        { key: ';', description: 'Repeat find' },
    ]
  },
  {
    id: 17,
    title: "Matching Brackets",
    description: "Place cursor on a bracket and press '%' to jump to its match.",
    initialText: [
      "function() {",
      "  // code",
      "}"
    ],
    initialCursor: { row: 0, col: 11 }, // on {
    goalType: 'CURSOR',
    targetCursor: { row: 2, col: 0 }, // on }
    hint: "Press '%' to jump to the matching closing brace.",
    availableCommands: [
        { key: '%', description: 'Match pair' },
    ]
  },
  {
    id: 18,
    title: "Join Lines",
    description: "Capital 'J' joins the current line with the next one.",
    initialText: [
      "This sentence",
      "is broken."
    ],
    initialCursor: { row: 0, col: 0 },
    goalType: 'TEXT',
    targetText: [
      "This sentence is broken."
    ],
    hint: "Press 'J' on the first line.",
    availableCommands: [
        { key: 'J', description: 'Join lines' },
    ]
  },
  {
    id: 19,
    title: "Replace Character",
    description: "Use 'r' + character to replace the one under the cursor without entering Insert mode.",
    initialText: [
      "I like cats.",
      "Change cats to bats."
    ],
    initialCursor: { row: 0, col: 7 }, // on c
    goalType: 'TEXT',
    targetText: [
      "I like bats.",
      "Change cats to bats."
    ],
    hint: "Move to 'c', press 'rb'.",
    availableCommands: [
        { key: 'r', description: 'Replace char' },
    ]
  },
  {
    id: 20,
    title: "The Final Exam",
    description: "Combine your skills to fix this code snippet.",
    initialText: [
      "functon fixMe() {",
      "  var x = 1;",
      "  var y = 2",
      "  return x + y;",
      "}",
      "// Remove this comment"
    ],
    initialCursor: { row: 0, col: 0 },
    goalType: 'TEXT',
    targetText: [
      "function fixMe() {",
      "  var x = 1;",
      "  var y = 2;",
      "  return x + y;",
      "}"
    ],
    hint: "Fix 'functon' -> 'function', add ';' to y=2, delete last line.",
    availableCommands: [
        { key: 'i', description: 'Insert' },
        { key: 'A', description: 'Append' },
        { key: 'dd', description: 'Delete line' },
    ]
  },
  {
    id: 21,
    title: "Word Operators - Delete Word",
    description: "Use 'dw' to delete from cursor to start of next word.",
    initialText: [
      "Remove the word 'extra' from this sentence.",
      "This is an extra good example."
    ],
    initialCursor: { row: 1, col: 11 },
    goalType: 'TEXT',
    targetText: [
      "Remove the word 'extra' from this sentence.",
      "This is an good example."
    ],
    hint: "Position cursor on 'e' of 'extra', then press 'dw'.",
    availableCommands: [
        { key: 'dw', description: 'Delete word' },
        { key: 'w', description: 'Move to next word' },
    ]
  },
  {
    id: 22,
    title: "Change Word",
    description: "Use 'cw' to change a word (delete and enter insert mode).",
    initialText: [
      "Change 'slow' to 'fast'.",
      "VIM is slow."
    ],
    initialCursor: { row: 1, col: 7 },
    goalType: 'TEXT',
    targetText: [
      "Change 'slow' to 'fast'.",
      "VIM is fast."
    ],
    hint: "Press 'cw', type 'fast', then Esc.",
    availableCommands: [
        { key: 'cw', description: 'Change word' },
        { key: 'Esc', description: 'Exit insert mode' },
    ]
  },
  {
    id: 23,
    title: "Delete Inside Word",
    description: "Use 'diw' to delete the entire word under cursor.",
    initialText: [
      "Delete the word 'completely'.",
      "Remove this completely from here."
    ],
    initialCursor: { row: 1, col: 14 },
    goalType: 'TEXT',
    targetText: [
      "Delete the word 'completely'.",
      "Remove this  from here."
    ],
    hint: "Press 'diw' to delete the word under cursor.",
    availableCommands: [
        { key: 'diw', description: 'Delete inside word' },
    ]
  },
  {
    id: 24,
    title: "Change Inside Word",
    description: "Use 'ciw' to change the entire word under cursor.",
    initialText: [
      "Change 'terrible' to 'amazing'.",
      "This is terrible code."
    ],
    initialCursor: { row: 1, col: 10 },
    goalType: 'TEXT',
    targetText: [
      "Change 'terrible' to 'amazing'.",
      "This is amazing code."
    ],
    hint: "Press 'ciw', type 'amazing', then Esc.",
    availableCommands: [
        { key: 'ciw', description: 'Change inside word' },
        { key: 'Esc', description: 'Exit insert mode' },
    ]
  },
  {
    id: 25,
    title: "Delete Inside Brackets",
    description: "Use 'di{' or 'di(' to delete content inside brackets.",
    initialText: [
      "Clear the function body.",
      "function test() {",
      "  console.log('remove this');",
      "  return true;",
      "}"
    ],
    initialCursor: { row: 2, col: 5 },
    goalType: 'TEXT',
    targetText: [
      "Clear the function body.",
      "function test() {",
      "}"
    ],
    hint: "Move inside the brackets and press 'di{'.",
    availableCommands: [
        { key: 'di{', description: 'Delete inside {}' },
        { key: 'di(', description: 'Delete inside ()' },
    ]
  },
  {
    id: 26,
    title: "Change Inside Quotes",
    description: "Use 'ci\"' or \"ci'\" to change text inside quotes.",
    initialText: [
      "Change the string content.",
      "const message = \"old text\";"
    ],
    initialCursor: { row: 1, col: 18 },
    goalType: 'TEXT',
    targetText: [
      "Change the string content.",
      "const message = \"new text\";"
    ],
    hint: "Press 'ci\"', type 'new text', then Esc.",
    availableCommands: [
        { key: 'ci\"', description: 'Change inside \"\"' },
        { key: "ci'", description: "Change inside ''" },
    ]
  },
  {
    id: 27,
    title: "Delete Around Word",
    description: "Use 'daw' to delete word and surrounding space.",
    initialText: [
      "Remove 'very' and its space.",
      "This is very very good."
    ],
    initialCursor: { row: 1, col: 8 },
    goalType: 'TEXT',
    targetText: [
      "Remove 'very' and its space.",
      "This is very good."
    ],
    hint: "Press 'daw' to delete word with space.",
    availableCommands: [
        { key: 'daw', description: 'Delete around word' },
        { key: 'diw', description: 'Delete inside word' },
    ]
  },
  {
    id: 28,
    title: "Relative Line Jumps",
    description: "Use number + j/k to jump multiple lines.",
    initialText: [
      "Line 1",
      "Line 2",
      "Line 3",
      "Line 4",
      "Line 5",
      "Target line"
    ],
    initialCursor: { row: 0, col: 0 },
    goalType: 'CURSOR',
    targetCursor: { row: 5, col: 0 },
    hint: "Press '5j' to jump down 5 lines.",
    availableCommands: [
        { key: '{n}j', description: 'Jump n lines down' },
        { key: '{n}k', description: 'Jump n lines up' },
    ]
  },
  {
    id: 29,
    title: "Paragraph Jumps",
    description: "Use '{' and '}' to jump between paragraphs.",
    initialText: [
      "First paragraph.",
      "More text here.",
      "",
      "Second paragraph.",
      "Jump to this.",
      "",
      "Third paragraph."
    ],
    initialCursor: { row: 0, col: 0 },
    goalType: 'CURSOR',
    targetCursor: { row: 3, col: 0 },
    hint: "Press '}' to jump to next paragraph.",
    availableCommands: [
        { key: '}', description: 'Next paragraph' },
        { key: '{', description: 'Previous paragraph' },
    ]
  },
  {
    id: 30,
    title: "Delete Inside Paragraph",
    description: "Use 'dip' to delete entire paragraph.",
    initialText: [
      "Keep this line.",
      "",
      "Delete this paragraph.",
      "All of these lines.",
      "Should be removed.",
      "",
      "Keep this too."
    ],
    initialCursor: { row: 3, col: 5 },
    goalType: 'TEXT',
    targetText: [
      "Keep this line.",
      "",
      "",
      "Keep this too."
    ],
    hint: "Press 'dip' to delete the paragraph.",
    availableCommands: [
        { key: 'dip', description: 'Delete inside paragraph' },
        { key: 'dap', description: 'Delete around paragraph' },
    ]
  },
  {
    id: 31,
    title: "Till Character",
    description: "Use 't' to move till (before) a character.",
    initialText: [
      "Move till the comma.",
      "Hello, World!"
    ],
    initialCursor: { row: 1, col: 0 },
    goalType: 'CURSOR',
    targetCursor: { row: 1, col: 4 },
    hint: "Press 't,' to move till comma.",
    availableCommands: [
        { key: 't{char}', description: 'Till character' },
        { key: 'T{char}', description: 'Till character backward' },
        { key: ';', description: 'Repeat motion' },
    ]
  },
  {
    id: 32,
    title: "Delete Till Character",
    description: "Combine 'd' with 't' to delete till a character.",
    initialText: [
      "Delete till the colon.",
      "Name: John Doe"
    ],
    initialCursor: { row: 1, col: 0 },
    goalType: 'TEXT',
    targetText: [
      "Delete till the colon.",
      ": John Doe"
    ],
    hint: "Press 'dt:' to delete till colon.",
    availableCommands: [
        { key: 'dt{char}', description: 'Delete till character' },
        { key: 'df{char}', description: 'Delete find character' },
    ]
  },
  {
    id: 33,
    title: "Change Till Character",
    description: "Use 'ct' to change text till a character.",
    initialText: [
      "Change till the period.",
      "Old text. Keep this."
    ],
    initialCursor: { row: 1, col: 0 },
    goalType: 'TEXT',
    targetText: [
      "Change till the period.",
      "New text. Keep this."
    ],
    hint: "Press 'ct.', type 'New text', then Esc.",
    availableCommands: [
        { key: 'ct{char}', description: 'Change till character' },
        { key: 'cf{char}', description: 'Change find character' },
    ]
  },
  {
    id: 34,
    title: "Visual Line Mode",
    description: "Use 'V' to select entire lines.",
    initialText: [
      "Select these lines.",
      "Line 1 to delete",
      "Line 2 to delete",
      "Line 3 to delete",
      "Keep this line."
    ],
    initialCursor: { row: 1, col: 0 },
    goalType: 'TEXT',
    targetText: [
      "Select these lines.",
      "Keep this line."
    ],
    hint: "Press 'V', then '2j' to select 3 lines, then 'd'.",
    availableCommands: [
        { key: 'V', description: 'Visual line mode' },
        { key: 'j/k', description: 'Extend selection' },
        { key: 'd', description: 'Delete selection' },
    ]
  },
  {
    id: 35,
    title: "Visual Block Mode",
    description: "Use Ctrl+v to select rectangular blocks.",
    initialText: [
      "Select the numbers.",
      "1. First item",
      "2. Second item",
      "3. Third item"
    ],
    initialCursor: { row: 1, col: 0 },
    goalType: 'TEXT',
    targetText: [
      "Select the numbers.",
      " First item",
      " Second item",
      " Third item"
    ],
    hint: "Press Ctrl+v, select block with j and l, then 'd'.",
    availableCommands: [
        { key: 'Ctrl+v', description: 'Visual block mode' },
        { key: 'j/k/h/l', description: 'Extend block' },
        { key: 'd', description: 'Delete block' },
    ]
  },
  {
    id: 36,
    title: "Increment Numbers",
    description: "Use Ctrl+a to increment numbers.",
    initialText: [
      "Increment the number.",
      "Version: 1.0.0"
    ],
    initialCursor: { row: 1, col: 9 },
    goalType: 'TEXT',
    targetText: [
      "Increment the number.",
      "Version: 2.0.0"
    ],
    hint: "Move to '1' and press Ctrl+a.",
    availableCommands: [
        { key: 'Ctrl+a', description: 'Increment number' },
        { key: 'Ctrl+x', description: 'Decrement number' },
    ]
  },
  {
    id: 37,
    title: "Repeat Last Change",
    description: "Use '.' to repeat the last change.",
    initialText: [
      "Add semicolons to each line.",
      "let x = 1",
      "let y = 2",
      "let z = 3"
    ],
    initialCursor: { row: 1, col: 9 },
    goalType: 'TEXT',
    targetText: [
      "Add semicolons to each line.",
      "let x = 1;",
      "let y = 2;",
      "let z = 3;"
    ],
    hint: "Press 'A;' then Esc. Move down with 'j' and press '.' twice.",
    availableCommands: [
        { key: 'A', description: 'Append at end' },
        { key: '.', description: 'Repeat last change' },
        { key: 'j', description: 'Move down' },
    ]
  },
  {
    id: 38,
    title: "Swap Characters",
    description: "Use 'xp' to swap two characters.",
    initialText: [
      "Fix the typo.",
      "Teh quick brown fox"
    ],
    initialCursor: { row: 1, col: 0 },
    goalType: 'TEXT',
    targetText: [
      "Fix the typo.",
      "The quick brown fox"
    ],
    hint: "Move to 'e', press 'x' then 'p'.",
    availableCommands: [
        { key: 'x', description: 'Delete character' },
        { key: 'p', description: 'Paste after' },
        { key: 'P', description: 'Paste before' },
    ]
  },
  {
    id: 39,
    title: "Swap Lines",
    description: "Use 'ddp' to swap current line with next.",
    initialText: [
      "Swap these lines.",
      "Second line",
      "First line"
    ],
    initialCursor: { row: 2, col: 0 },
    goalType: 'TEXT',
    targetText: [
      "Swap these lines.",
      "First line",
      "Second line"
    ],
    hint: "Press 'dd' then 'k' then 'P'.",
    availableCommands: [
        { key: 'dd', description: 'Delete line' },
        { key: 'p', description: 'Paste below' },
        { key: 'P', description: 'Paste above' },
    ]
  },
  {
    id: 40,
    title: "Duplicate Line",
    description: "Use 'yyp' to duplicate a line.",
    initialText: [
      "Duplicate this line.",
      "console.log('Hello');"
    ],
    initialCursor: { row: 1, col: 0 },
    goalType: 'TEXT',
    targetText: [
      "Duplicate this line.",
      "console.log('Hello');",
      "console.log('Hello');"
    ],
    hint: "Press 'yy' then 'p'.",
    availableCommands: [
        { key: 'yy', description: 'Yank line' },
        { key: 'p', description: 'Paste below' },
    ]
  },
  {
    id: 41,
    title: "Change Case",
    description: "Use '~' to toggle case of character.",
    initialText: [
      "Toggle case.",
      "hello WORLD"
    ],
    initialCursor: { row: 1, col: 0 },
    goalType: 'TEXT',
    targetText: [
      "Toggle case.",
      "HELLO world"
    ],
    hint: "Press '~' multiple times or select with 'v' then '~'.",
    availableCommands: [
        { key: '~', description: 'Toggle case' },
        { key: 'v', description: 'Visual mode' },
    ]
  },
  {
    id: 42,
    title: "Indent Lines",
    description: "Use '>>' to indent, '<<' to unindent.",
    initialText: [
      "Indent the code.",
      "function test() {",
      "console.log('test');",
      "return true;",
      "}"
    ],
    initialCursor: { row: 2, col: 0 },
    goalType: 'TEXT',
    targetText: [
      "Indent the code.",
      "function test() {",
      "  console.log('test');",
      "  return true;",
      "}"
    ],
    hint: "Select lines 2-3 with 'V', then press '>'.",
    availableCommands: [
        { key: '>>', description: 'Indent line' },
        { key: '<<', description: 'Unindent line' },
        { key: 'V', description: 'Visual line mode' },
    ]
  },
  {
    id: 43,
    title: "Go to Line",
    description: "Use ':' followed by line number to jump.",
    initialText: [
      "Line 1",
      "Line 2",
      "Line 3",
      "Line 4",
      "Line 5",
      "Line 6",
      "Line 7",
      "Line 8",
      "Line 9",
      "Target line 10"
    ],
    initialCursor: { row: 0, col: 0 },
    goalType: 'CURSOR',
    targetCursor: { row: 9, col: 0 },
    hint: "Press '10G' or 'gg' then '9j'.",
    availableCommands: [
        { key: '{n}G', description: 'Go to line n' },
        { key: 'gg', description: 'Go to first line' },
        { key: 'G', description: 'Go to last line' },
    ]
  },
  {
    id: 44,
    title: "Search and Replace in Line",
    description: "Use ':s/old/new/' to replace in current line.",
    initialText: [
      "Replace 'cat' with 'dog'.",
      "The cat sat on the cat."
    ],
    initialCursor: { row: 1, col: 0 },
    goalType: 'TEXT',
    targetText: [
      "Replace 'cat' with 'dog'.",
      "The dog sat on the dog."
    ],
    hint: "Type ':s/cat/dog/g' and press Enter.",
    availableCommands: [
        { key: ':s/old/new/', description: 'Replace first' },
        { key: ':s/old/new/g', description: 'Replace all in line' },
    ]
  },
  {
    id: 45,
    title: "Multiple Cursors Effect",
    description: "Use visual block + 'I' to insert at multiple lines.",
    initialText: [
      "Add '//' to each line.",
      "Line 1",
      "Line 2",
      "Line 3"
    ],
    initialCursor: { row: 1, col: 0 },
    goalType: 'TEXT',
    targetText: [
      "Add '//' to each line.",
      "// Line 1",
      "// Line 2",
      "// Line 3"
    ],
    hint: "Ctrl+v, select 3 lines with 'jj', press 'I', type '//', then Esc.",
    availableCommands: [
        { key: 'Ctrl+v', description: 'Visual block' },
        { key: 'I', description: 'Insert at start' },
        { key: 'A', description: 'Append at end' },
    ]
  },
  {
    id: 46,
    title: "Delete Multiple Lines",
    description: "Use number + 'dd' to delete multiple lines.",
    initialText: [
      "Keep this line.",
      "Delete line 1",
      "Delete line 2",
      "Delete line 3",
      "Keep this too."
    ],
    initialCursor: { row: 1, col: 0 },
    goalType: 'TEXT',
    targetText: [
      "Keep this line.",
      "Keep this too."
    ],
    hint: "Press '3dd' to delete 3 lines.",
    availableCommands: [
        { key: '{n}dd', description: 'Delete n lines' },
        { key: 'dj', description: 'Delete current and next' },
    ]
  },
  {
    id: 47,
    title: "Yank Multiple Lines",
    description: "Use number + 'yy' to copy multiple lines.",
    initialText: [
      "Copy these 2 lines.",
      "Line A",
      "Line B",
      "Paste here:"
    ],
    initialCursor: { row: 1, col: 0 },
    goalType: 'TEXT',
    targetText: [
      "Copy these 2 lines.",
      "Line A",
      "Line B",
      "Paste here:",
      "Line A",
      "Line B"
    ],
    hint: "Press '2yy', move to line 4, press 'p'.",
    availableCommands: [
        { key: '{n}yy', description: 'Yank n lines' },
        { key: 'p', description: 'Paste below' },
    ]
  },
  {
    id: 48,
    title: "Change to End of Line",
    description: "Use 'C' to change from cursor to end of line.",
    initialText: [
      "Change the end.",
      "Keep this, delete rest"
    ],
    initialCursor: { row: 1, col: 11 },
    goalType: 'TEXT',
    targetText: [
      "Change the end.",
      "Keep this, new text"
    ],
    hint: "Press 'C', type 'new text', then Esc.",
    availableCommands: [
        { key: 'C', description: 'Change to end of line' },
        { key: 'D', description: 'Delete to end of line' },
    ]
  },
  {
    id: 49,
    title: "Replace Mode",
    description: "Use 'R' to enter replace mode.",
    initialText: [
      "Replace characters.",
      "XXXXX World"
    ],
    initialCursor: { row: 1, col: 0 },
    goalType: 'TEXT',
    targetText: [
      "Replace characters.",
      "Hello World"
    ],
    hint: "Press 'R', type 'Hello', then Esc.",
    availableCommands: [
        { key: 'R', description: 'Replace mode' },
        { key: 'r', description: 'Replace one char' },
    ]
  },
  {
    id: 50,
    title: "VIM Master Complete",
    description: "Final challenge: Use all your skills!",
    initialText: [
      "// TODO: Fix this code",
      "function calculate(a,b) {",
      "  let result = a + b",
      "  console.log(result)",
      "  return result",
      "}",
      "// Remove this comment",
      "calculate(5, 10)"
    ],
    initialCursor: { row: 0, col: 0 },
    goalType: 'TEXT',
    targetText: [
      "function calculate(a, b) {",
      "  let result = a + b;",
      "  console.log(result);",
      "  return result;",
      "}",
      "calculate(5, 10);"
    ],
    hint: "Remove TODO line, add semicolons, fix spacing, remove comment.",
    availableCommands: [
        { key: 'dd', description: 'Delete line' },
        { key: 'A', description: 'Append' },
        { key: 'f', description: 'Find character' },
        { key: 'i', description: 'Insert' },
    ]
  }
];

export const BADGES = [
  { id: 'beginner', name: 'Beginner', icon: '🟢', description: 'Completed first 5 levels' },
  { id: 'search_master', name: 'Search Master', icon: '🔎', description: 'Mastered search commands' },
  { id: 'visual_artist', name: 'Visual Artist', icon: '🎨', description: 'Used Visual Mode effectively' },
  { id: 'challenger', name: 'Challenger', icon: '🏆', description: 'Scored 1000+ points in Challenge Mode' }
];

export const CHEAT_SHEET_DATA = {
  Movement: [
    { key: 'h j k l', desc: 'Left, Down, Up, Right' },
    { key: 'w', desc: 'Jump forward to start of word' },
    { key: 'b', desc: 'Jump backward to start of word' },
    { key: 'e', desc: 'Jump forward to end of word' },
    { key: 'gg', desc: 'Go to first line' },
    { key: 'G', desc: 'Go to last line' },
    { key: '0', desc: 'Go to start of line' },
    { key: '$', desc: 'Go to end of line' },
    { key: 'f{char}', desc: 'Jump to char' },
    { key: '%', desc: 'Jump to match' },
  ],
  Editing: [
    { key: 'i', desc: 'Insert before cursor' },
    { key: 'a', desc: 'Append after cursor' },
    { key: 'A', desc: 'Append at end of line' },
    { key: 'o', desc: 'Open new line below' },
    { key: 'O', desc: 'Open new line above' },
    { key: 'x', desc: 'Delete character' },
    { key: 'dd', desc: 'Delete line' },
    { key: 'dw', desc: 'Delete word' },
    { key: 'D', desc: 'Delete to end of line' },
    { key: 'r', desc: 'Replace single character' },
    { key: 'J', desc: 'Join lines' },
    { key: 'u', desc: 'Undo' },
    { key: 'Ctrl+r', desc: 'Redo' },
  ],
  Visual: [
    { key: 'v', desc: 'Enter Visual Mode' },
    { key: 'y', desc: 'Yank (copy) selection' },
    { key: 'd', desc: 'Delete selection' },
    { key: 'c', desc: 'Change selection' },
  ],
  Search: [
    { key: '/pattern', desc: 'Search forward' },
    { key: '?pattern', desc: 'Search backward' },
    { key: 'n', desc: 'Next match' },
    { key: 'N', desc: 'Previous match' },
  ]
};