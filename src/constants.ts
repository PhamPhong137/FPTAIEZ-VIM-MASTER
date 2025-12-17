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