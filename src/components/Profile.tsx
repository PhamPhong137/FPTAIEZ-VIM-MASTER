import React from 'react';
import { UserProgress } from '../types';
import { BADGES } from '../constants';
import { Trophy, Share2, Save, Upload, Download } from 'lucide-react';
import { exportProgress, importProgress } from '../utils/storage';

interface ProfileProps {
  progress: UserProgress;
  onClose: () => void;
  onReset: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ progress, onClose, onReset }) => {
  const handleExport = () => {
    const code = exportProgress();
    navigator.clipboard.writeText(code);
    alert("Progress code copied to clipboard!");
  };

  const handleImport = () => {
    const code = prompt("Paste your progress code:");
    if (code) {
      if (importProgress(code)) {
        alert("Progress restored! Refreshing...");
        window.location.reload();
      } else {
        alert("Invalid code.");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-[#1e1e1e] z-50 overflow-y-auto">
       <div className="max-w-4xl mx-auto p-8">
          <div className="flex justify-between items-center mb-12">
             <h1 className="text-4xl font-bold text-white font-mono">
                <span className="text-blue-400">FPTAIEZ</span>
             </h1>
             <button onClick={onClose} className="text-gray-500 hover:text-gray-300 underline transition-colors">
                Back to Game
             </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {/* Stats Card */}
             <div className="bg-[#2d2d2d] border border-[#3a3a3a] p-6 rounded-xl shadow-xl">
                <h2 className="text-2xl text-white mb-6 flex items-center gap-2 font-semibold">
                    <Trophy className="text-yellow-400" /> Statistics
                </h2>
                <div className="space-y-4">
                    <div className="flex justify-between items-end border-b border-[#3a3a3a] pb-3">
                        <span className="text-gray-400">Current Level</span>
                        <span className="text-3xl text-white font-bold">{progress.currentLevel}</span>
                    </div>
                    <div className="flex justify-between items-end border-b border-[#3a3a3a] pb-3">
                        <span className="text-gray-400">Challenge Points</span>
                        <span className="text-3xl text-yellow-400 font-bold">{progress.challengePoints}</span>
                    </div>
                    <div className="flex justify-between items-end border-b border-[#3a3a3a] pb-3">
                        <span className="text-gray-400">Badges Earned</span>
                        <span className="text-3xl text-blue-400 font-bold">{progress.badges.length}</span>
                    </div>
                </div>
             </div>

             {/* Badges Grid */}
             <div className="bg-[#2d2d2d] border border-[#3a3a3a] p-6 rounded-xl shadow-xl">
                 <h2 className="text-2xl text-white mb-6 font-semibold">Badges</h2>
                 <div className="grid grid-cols-3 gap-4">
                     {BADGES.map(badge => {
                         const earned = progress.badges.includes(badge.id);
                         return (
                             <div key={badge.id} className={`flex flex-col items-center p-3 rounded-lg border transition-all ${earned ? 'border-blue-500/40 bg-blue-500/10 shadow-lg' : 'border-[#3a3a3a] bg-[#252525] opacity-50'}`}>
                                 <div className="text-3xl mb-2">{badge.icon}</div>
                                 <span className="text-xs text-center text-gray-300 font-semibold">{badge.name}</span>
                             </div>
                         );
                     })}
                 </div>
             </div>
          </div>

          {/* Data Management */}
          <div className="mt-8 bg-[#2d2d2d] border border-[#3a3a3a] p-6 rounded-xl shadow-xl">
             <h2 className="text-xl text-white mb-4 flex items-center gap-2 font-semibold">
                 <Save className="text-blue-400" size={20} /> Data Management
             </h2>
             <p className="text-gray-400 mb-6">
                Your progress is stored locally in your browser. You can export it to transfer to another device or backup your data.
             </p>
             <div className="flex flex-wrap gap-4">
                 <button onClick={handleExport} className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2.5 rounded-lg transition-all shadow-md font-semibold">
                     <Download size={18} /> Export Progress
                 </button>
                 <button onClick={handleImport} className="flex items-center gap-2 bg-[#3a3a3a] hover:bg-[#454545] text-white px-4 py-2.5 rounded-lg transition-all border border-[#4a4a4a] font-semibold">
                     <Upload size={18} /> Import Progress
                 </button>
                 <button onClick={onReset} className="flex items-center gap-2 bg-red-900/40 hover:bg-red-900/60 text-red-300 border border-red-800/50 px-4 py-2.5 rounded-lg transition-all ml-auto font-semibold">
                     Reset All Data
                 </button>
             </div>
          </div>
          
          <div className="mt-12 text-center text-gray-500 text-sm">
             VIM Master v2.0 • Created with React & Tailwind
          </div>
       </div>
    </div>
  );
};
