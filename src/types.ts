export enum VimMode {
  NORMAL = 'NORMAL',
  INSERT = 'INSERT',
  VISUAL = 'VISUAL',
  COMMAND = 'COMMAND', // For : / ?
}

export interface Cursor {
  row: number;
  col: number;
}

export interface Level {
  id: number;
  title: string;
  description: string;
  initialText: string[];
  initialCursor: Cursor;
  goalType: 'CURSOR' | 'TEXT' | 'search';
  targetCursor?: Cursor;
  targetText?: string[];
  hint: string;
  availableCommands: { key: string; description: string }[]; // New field for sidebar
}

export interface Challenge {
  id: string;
  name: string;
  description: string;
  duration: number; // seconds
  setup: (baseText: string[]) => { text: string[], cursor: Cursor };
  validate: (text: string[], cursor: Cursor) => number; // returns score
}

export interface GameState {
  lines: string[];
  cursor: Cursor;
  visualStart: Cursor | null; // Start position for Visual Mode
  mode: VimMode;
  commandBuffer: string; // for counts or partial commands like 'd'
  commandLine: string; // for : / ? inputs
  statusMessage: string;
  history: { lines: string[]; cursor: Cursor }[];
  future: { lines: string[]; cursor: Cursor }[];
  searchQuery: string;
  clipboard: string | null;
  lastSearchDirection: 'forward' | 'backward';
  recentKeys: string[]; // For visual command log
}

export interface UserProgress {
  currentLevel: number;
  badges: string[];
  challengePoints: number;
  codesUsed: string[];
}