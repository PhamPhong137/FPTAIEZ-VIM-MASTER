import React, { useState } from 'react';
import { X, Search } from 'lucide-react';

interface CheatSheetProps {
  onClose: () => void;
}

interface Command {
  keys: string;
  title: string;
  description: string;
  highlighted?: boolean;
}

const cheatSheetData: { category: string; commands: Command[] }[] = [
  {
    category: 'Movement',
    commands: [
      {
        keys: 'h / j / k / l',
        title: 'Basic movement: left/down/up/right',
        description: 'Navigate around text with precision.',
      },
      {
        keys: 'w / b / e',
        title: 'Word motions: next/back/end',
        description: 'Jump between words quickly.',
      },
      {
        keys: 'gg / G',
        title: 'Go to first/last line',
        description: 'Jump to file bounds.',
      },
      {
        keys: '0 / $',
        title: 'Line start / end',
        description: 'Move to start or end of line.',
        highlighted: true,
      },
      {
        keys: 'f{char}',
        title: 'Find character',
        description: 'Jump to next occurrence of character.',
      },
      {
        keys: '%',
        title: 'Match bracket',
        description: 'Jump to matching bracket.',
      },
    ],
  },
  {
    category: 'Editing',
    commands: [
      {
        keys: 'i / a',
        title: 'Insert/Append text',
        description: 'Enter insert mode to type.',
      },
      {
        keys: 'A',
        title: 'Append at end of line',
        description: 'Jump to end and insert.',
      },
      {
        keys: 'o / O',
        title: 'Open new line below/above',
        description: 'Create new line and insert.',
      },
      {
        keys: 'x',
        title: 'Delete character',
        description: 'Remove a single character.',
      },
      {
        keys: 'dd',
        title: 'Delete line',
        description: 'Remove an entire line.',
      },
      {
        keys: 'dw',
        title: 'Delete word',
        description: 'Remove word from cursor.',
      },
      {
        keys: 'yy / p',
        title: 'Yank and paste line',
        description: 'Copy and paste a line.',
      },
      {
        keys: 'cw',
        title: 'Change word',
        description: 'Delete word and enter insert.',
      },
      {
        keys: 'D',
        title: 'Delete to end of line',
        description: 'Trim line from cursor to end.',
        highlighted: true,
      },
      {
        keys: 'r',
        title: 'Replace one character',
        description: 'Replace character under cursor.',
      },
      {
        keys: 'J',
        title: 'Join lines',
        description: 'Merge current line with next.',
      },
    ],
  },
  {
    category: 'Search',
    commands: [
      {
        keys: '/text',
        title: 'Search forward for text',
        description: 'Use / then Enter to jump.',
      },
      {
        keys: '?text',
        title: 'Search backward for text',
        description: 'Use ? then Enter to jump.',
      },
      {
        keys: 'n / N',
        title: 'Next / Previous match',
        description: 'Navigate search results.',
        highlighted: true,
      },
    ],
  },
  {
    category: 'Visual Mode',
    commands: [
      {
        keys: 'v',
        title: 'Enter visual mode',
        description: 'Select text character by character.',
      },
      {
        keys: 'V',
        title: 'Visual line mode',
        description: 'Select entire lines.',
      },
      {
        keys: 'y',
        title: 'Yank selection',
        description: 'Copy selected text.',
      },
      {
        keys: 'd',
        title: 'Delete selection',
        description: 'Remove selected text.',
      },
    ],
  },
  {
    category: 'Other',
    commands: [
      {
        keys: 'u / Ctrl+r',
        title: 'Undo / Redo changes',
        description: 'Revert or re-apply edits.',
      },
      {
        keys: ':q / :wq',
        title: 'Quit / Write & Quit',
        description: 'Use ex-commands.',
      },
      {
        keys: 'Esc',
        title: 'Return to normal mode',
        description: 'Exit insert or visual mode.',
      },
    ],
  },
];

export const CheatSheet: React.FC<CheatSheetProps> = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = cheatSheetData.map((section) => ({
    ...section,
    commands: section.commands.filter(
      (cmd) =>
        cmd.keys.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cmd.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cmd.description.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((section) => section.commands.length > 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-[#2d2d2d] w-full max-w-4xl rounded-xl border border-[#3a3a3a] shadow-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-[#3a3a3a]">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <span className="text-yellow-400">?</span> VIM Cheat Sheet
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-300 transition-colors">
            <X size={22} />
          </button>
        </div>
        
        {/* Search */}
        <div className="p-5 border-b border-[#3a3a3a]">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search commands (e.g., 'delete', 'w')" 
              className="w-full bg-[#1e1e1e] border border-[#4a4a4a] rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-5 flex-grow">
          {filteredData.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No commands found.
            </div>
          ) : (
            <div className="space-y-6">
              {filteredData.map((section) => (
                <div key={section.category}>
                  <h3 className="text-blue-400 font-semibold mb-3 uppercase text-sm tracking-wider">
                    {section.category}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {section.commands.map((cmd, idx) => (
                      <div
                        key={idx}
                        className={`bg-[#3a3a3a] p-3 rounded-lg border transition-all cursor-pointer group ${
                          cmd.highlighted
                            ? 'border-yellow-500/50 hover:border-yellow-500/70'
                            : 'border-[#4a4a4a] hover:border-[#5a5a5a]'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <code className="bg-[#1e1e1e] text-yellow-400 px-2.5 py-1 rounded-md text-sm font-semibold">
                            {cmd.keys}
                          </code>
                        </div>
                        <h4 className="text-white font-medium text-sm mb-1 group-hover:text-blue-300 transition-colors">
                          {cmd.title}
                        </h4>
                        <p className="text-gray-400 text-xs group-hover:text-gray-300 transition-colors">
                          {cmd.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-[#3a3a3a] bg-[#252525] rounded-b-xl">
          <p className="text-xs text-center text-gray-500">
            Pro Tip: Use <span className="text-gray-300 font-semibold">Ctrl+/</span> to toggle this cheat sheet anytime.
          </p>
        </div>
      </div>
    </div>
  );
};
