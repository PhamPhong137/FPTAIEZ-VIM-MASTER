import React, { useState, useEffect, useCallback } from 'react';
import { LEVELS, BADGES } from './constants';
import { GameState, UserProgress, VimMode } from './types';
import { createInitialState, processKey } from './utils/vimEngine';
import { loadProgress, saveProgress } from './utils/storage';
import { VimEditor } from './components/VimEditor';
import { CheatSheet } from './components/CheatSheet';
import { Profile } from './components/Profile';
import { Keyboard, Trophy, HelpCircle, User, Settings, Flag } from 'lucide-react';

const App: React.FC = () => {
  const [progress, setProgress] = useState<UserProgress>(loadProgress());
  const [currentLevel, setCurrentLevel] = useState(LEVELS[progress.currentLevel - 1] || LEVELS[0]);
  const [gameState, setGameState] = useState<GameState>(createInitialState(currentLevel.initialText));
  const [showCheatSheet, setShowCheatSheet] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isEditorFocused, setIsEditorFocused] = useState(true);

  // Load level state when level changes
  useEffect(() => {
    const level = LEVELS[progress.currentLevel - 1] || LEVELS[0];
    setCurrentLevel(level);
    setGameState(createInitialState(level.initialText));
    if (level.initialCursor) {
        setGameState(prev => ({ ...prev, cursor: level.initialCursor }));
    }
  }, [progress.currentLevel]);

  // Check Win Condition
  useEffect(() => {
    if (showCelebration) return;

    let won = false;
    if (currentLevel.goalType === 'CURSOR' && currentLevel.targetCursor) {
      if (gameState.cursor.row === currentLevel.targetCursor.row && 
          gameState.cursor.col === currentLevel.targetCursor.col) {
          won = true;
      }
    } else if (currentLevel.goalType === 'TEXT' && currentLevel.targetText) {
      const currentText = gameState.lines.map(l => l.trim()).join('\n');
      const targetText = currentLevel.targetText.map(l => l.trim()).join('\n');
      if (currentText === targetText) {
          won = true;
      }
    }

    if (won) {
        handleLevelComplete();
    }
  }, [gameState, currentLevel, showCelebration]);

  const handleLevelComplete = () => {
      const newBadges = [...progress.badges];
      if (progress.currentLevel === 5 && !newBadges.includes('beginner')) newBadges.push('beginner');
      if (currentLevel.title === 'Searching' && !newBadges.includes('search_master')) newBadges.push('search_master');

      const nextLevel = progress.currentLevel + 1;
      const isFinished = nextLevel > LEVELS.length;

      const newProgress = {
          ...progress,
          currentLevel: isFinished ? progress.currentLevel : nextLevel,
          badges: newBadges
      };

      saveProgress(newProgress);
      // Small delay to let the user see the result before switching
      setTimeout(() => {
          setProgress(newProgress);
          if (isFinished) setShowCelebration(true);
      }, 500);
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === '/') {
        e.preventDefault();
        setShowCheatSheet(prev => !prev);
        return;
    }
    setGameState(prev => processKey(prev, e.key, e.ctrlKey));
  }, []);

  const resetGame = () => {
      const initial = {
        currentLevel: 1,
        badges: [],
        challengePoints: 0,
        codesUsed: []
      };
      saveProgress(initial);
      setProgress(initial);
      window.location.reload();
  };

  if (showCelebration) {
      return (
          <div className="fixed inset-0 bg-[#0d1117] flex flex-col items-center justify-center text-white z-50">
              <h1 className="text-6xl font-bold mb-8 text-blue-500">Mastery Achieved</h1>
              <p className="text-xl mb-8 text-gray-400">You have completed the basic curriculum.</p>
              <button 
                onClick={() => { setShowCelebration(false); resetGame(); }}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-bold"
              >
                  Restart Journey
              </button>
          </div>
      );
  }

  if (showProfile) {
      return <Profile progress={progress} onClose={() => setShowProfile(false)} onReset={resetGame} />;
  }

  return (
    <div className="h-screen bg-[#0d1117] text-white font-sans flex flex-col overflow-hidden">
      {/* Top Navbar */}
      <header className="h-16 border-b border-gray-800 flex items-center justify-between px-6 bg-[#0d1117] shrink-0 z-10">
         <div className="flex items-center gap-3">
             <div className="bg-blue-600 p-1 rounded-md">
                <Keyboard className="text-white" size={20} />
             </div>
             <h1 className="text-xl font-bold tracking-tight">FPTAIEZ <span className="text-gray-400">VIM_MASTER</span></h1>
         </div>
         
         <div className="flex-1 max-w-xl mx-12 hidden md:block">
             <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                 <span>Mastery Level {progress.currentLevel}</span>
                 <span>{Math.round((progress.currentLevel / LEVELS.length) * 100)}%</span>
             </div>
             <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                 <div 
                    className="h-full bg-blue-600 rounded-full transition-all duration-500" 
                    style={{ width: `${(progress.currentLevel / LEVELS.length) * 100}%` }}
                 />
             </div>
         </div>

         <div className="flex items-center gap-4 text-gray-400">
             <Settings size={20} className="hover:text-white cursor-pointer" />
             <div 
                className="bg-yellow-100 text-yellow-800 rounded-full w-8 h-8 flex items-center justify-center font-bold cursor-pointer"
                onClick={() => setShowProfile(true)}
             >
                 <User size={16} />
             </div>
         </div>
      </header>

      {/* Main Split Layout */}
      <main className="flex flex-1 overflow-hidden">
          
          {/* Left Sidebar - Lesson & Instructions */}
          <aside className="w-full md:w-[400px] lg:w-[450px] bg-[#161b22] border-r border-gray-800 flex flex-col shrink-0 overflow-y-auto custom-scrollbar">
              <div className="p-8">
                  <div className="mb-6">
                      <span className="bg-[#1f2937] text-blue-400 text-xs font-bold px-2 py-1 rounded border border-gray-700">
                          LESSON {currentLevel.id}
                      </span>
                      <h2 className="text-3xl font-bold mt-4 mb-2 text-white">{currentLevel.title}</h2>
                      <p className="text-gray-400 leading-relaxed text-sm">
                          {currentLevel.description}
                      </p>
                  </div>

                  {/* Objective Box */}
                  <div className="bg-[#0d1117] border border-gray-800 border-l-4 border-l-blue-600 rounded-r-lg p-5 mb-8 shadow-sm">
                      <h3 className="text-white font-bold flex items-center gap-2 mb-2 text-sm">
                          <Flag size={16} className="text-blue-500 fill-blue-500" /> Current Objective
                      </h3>
                      <p className="text-gray-400 text-sm leading-6">
                          {currentLevel.hint}
                      </p>
                  </div>

                  {/* Available Commands */}
                  <div className="mb-8">
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                          <Keyboard size={14} /> Available Commands
                      </h3>
                      <div className="space-y-3">
                          {currentLevel.availableCommands?.map((cmd, idx) => (
                              <div key={idx} className="flex items-center group cursor-default">
                                  <kbd className="bg-[#21262d] border-b-2 border-gray-700 text-gray-200 px-3 py-2 rounded-md font-mono text-sm min-w-[3rem] text-center font-bold shadow-sm group-hover:bg-[#30363d] transition-colors">
                                      {cmd.key}
                                  </kbd>
                                  <span className="ml-4 text-gray-400 text-sm">{cmd.description}</span>
                              </div>
                          ))}
                      </div>
                  </div>

                  {/* Hint Button */}
                  <button 
                    onClick={() => setShowCheatSheet(true)}
                    className="w-full py-3 bg-[#1f2937] hover:bg-[#2d384d] text-blue-400 font-bold rounded-lg border border-gray-700 transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                      <HelpCircle size={16} /> View Hint
                  </button>
              </div>
          </aside>

          {/* Right Area - Editor */}
          <section className="flex-1 flex flex-col relative bg-[#0d1117]">
             <VimEditor 
                state={gameState} 
                onKeyDown={handleKeyDown} 
                isFocused={isEditorFocused}
                onFocus={() => setIsEditorFocused(true)}
             />
          </section>

      </main>

      {/* Modals */}
      {showCheatSheet && <CheatSheet onClose={() => setShowCheatSheet(false)} />}
    </div>
  );
};

export default App;
