import React, { useState, useEffect, useCallback } from 'react';
import { LEVELS, BADGES } from './constants';
import { GameState, UserProgress, VimMode } from './types';
import { createInitialState, processKey } from './utils/vimEngine';
import { loadProgress, saveProgress } from './utils/storage';
import { VimEditor } from './components/VimEditor';
import { CheatSheet } from './components/CheatSheet';
import { Profile } from './components/Profile';
import { Keyboard, Trophy, HelpCircle, User, Settings, Flag, BookOpen } from 'lucide-react';

const App: React.FC = () => {
  const [progress, setProgress] = useState<UserProgress>(loadProgress());
  const [currentLevel, setCurrentLevel] = useState(LEVELS[progress.currentLevel - 1] || LEVELS[0]);
  const [gameState, setGameState] = useState<GameState>(createInitialState(currentLevel.initialText));
  const [showCheatSheet, setShowCheatSheet] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showLevelComplete, setShowLevelComplete] = useState(false);
  const [isEditorFocused, setIsEditorFocused] = useState(true);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);

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
      // Hiển thị hiệu ứng chúc mừng
      setShowLevelComplete(true);
      
      const newBadges = [...progress.badges];
      if (currentLevel.id === 5 && !newBadges.includes('beginner')) newBadges.push('beginner');
      if (currentLevel.title === 'Searching' && !newBadges.includes('search_master')) newBadges.push('search_master');

      // Thêm level hiện tại vào danh sách đã hoàn thành
      const newCompletedLevels = [...completedLevels];
      if (!newCompletedLevels.includes(currentLevel.id)) {
        newCompletedLevels.push(currentLevel.id);
      }
      setCompletedLevels(newCompletedLevels);

      const isFinished = currentLevel.id === LEVELS.length;

      const newProgress = {
          ...progress,
          badges: newBadges
      };

      saveProgress(newProgress);
      
      // Tắt hiệu ứng sau 2 giây
      setTimeout(() => {
          setShowLevelComplete(false);
          if (isFinished) {
            setShowCelebration(true);
          }
      }, 2000);
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Không xử lý phím nếu đang mở modal
    if (showCheatSheet || showProfile) {
        return;
    }
    
    if (e.ctrlKey && e.key === '/') {
        e.preventDefault();
        setShowCheatSheet(prev => !prev);
        return;
    }
    setGameState(prev => processKey(prev, e.key, e.ctrlKey));
  }, [showCheatSheet, showProfile]);

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
          <div className="fixed inset-0 bg-[#1e1e1e] flex flex-col items-center justify-center text-white z-50">
              <h1 className="text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Mastery Achieved</h1>
              <p className="text-xl mb-8 text-gray-400">You have completed the basic curriculum.</p>
              <button 
                onClick={() => { setShowCelebration(false); resetGame(); }}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg text-white font-semibold shadow-xl transition-all"
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
    <div className="h-screen bg-[#1e1e1e] text-white font-sans flex flex-col overflow-hidden">
      {/* macOS Title Bar */}
      <div className="h-12 bg-[#2d2d2d] border-b border-[#1a1a1a] flex items-center px-4 shrink-0 select-none" style={{ WebkitAppRegion: 'drag' } as any}>
        {/* Traffic Lights */}
        <div className="flex items-center gap-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff6b63] cursor-pointer" style={{ WebkitAppRegion: 'no-drag' } as any}></div>
          <div className="w-3 h-3 rounded-full bg-[#febc2e] hover:bg-[#ffc43a] cursor-pointer" style={{ WebkitAppRegion: 'no-drag' } as any}></div>
          <div className="w-3 h-3 rounded-full bg-[#28c840] hover:bg-[#34d44c] cursor-pointer" style={{ WebkitAppRegion: 'no-drag' } as any}></div>
        </div>
        
        {/* Title */}
        <div className="flex-1 flex items-center justify-center">
          <span className="text-sm text-gray-400 font-medium">VIM Master - Level {progress.currentLevel}</span>
        </div>
        
        {/* Right side placeholder for symmetry */}
        <div className="w-20"></div>
      </div>

      {/* Top Toolbar */}
      <header className="h-14 border-b border-[#1a1a1a] flex items-center justify-between px-6 bg-[#252525] shrink-0 z-10">
         <div className="flex items-center gap-3">
             <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-1.5 rounded-lg shadow-lg">
                <Keyboard className="text-white" size={18} />
             </div>
             <h1 className="text-lg font-semibold tracking-tight">LEARN <span className="text-gray-500">VIM_MASTER</span></h1>
         </div>
         
         <div className="flex-1 max-w-xl mx-12 hidden md:block">
             <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
                 <span>Completed {completedLevels.length} / {LEVELS.length}</span>
                 <span>{Math.round((completedLevels.length / LEVELS.length) * 100)}%</span>
             </div>
             <div className="h-1.5 bg-[#3a3a3a] rounded-full overflow-hidden">
                 <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500 shadow-sm" 
                    style={{ width: `${(completedLevels.length / LEVELS.length) * 100}%` }}
                 />
             </div>
         </div>

         <div className="flex items-center gap-3 text-gray-500">
             <BookOpen 
                size={18} 
                className="hover:text-gray-300 cursor-pointer transition-colors" 
                onClick={() => setShowCheatSheet(true)}
                title="View Command Reference"
             />
             <Settings size={18} className="hover:text-gray-300 cursor-pointer transition-colors" />
             <div 
                className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full w-7 h-7 flex items-center justify-center font-bold cursor-pointer hover:from-blue-600 hover:to-blue-700 transition-all shadow-md"
                onClick={() => setShowProfile(true)}
             >
                 <User size={14} className="text-white" />
             </div>
         </div>
      </header>

      {/* Main Split Layout */}
      <main className="flex flex-1 overflow-hidden pb-16">
          
          {/* Left Sidebar - Lesson & Instructions */}
          <aside className="w-full md:w-[400px] lg:w-[450px] bg-[#252525] border-r border-[#1a1a1a] flex flex-col shrink-0 overflow-y-auto custom-scrollbar">
              <div className="p-8">
                  <div className="mb-6">
                      <span className="bg-[#3a3a3a] text-blue-400 text-xs font-semibold px-2.5 py-1 rounded-md border border-[#4a4a4a]">
                          LESSON {currentLevel.id}
                      </span>
                      <h2 className="text-3xl font-bold mt-4 mb-2 text-white">{currentLevel.title}</h2>
                      <p className="text-gray-400 leading-relaxed text-sm">
                          {currentLevel.description}
                      </p>
                  </div>

                  {/* Objective Box */}
                  <div className="bg-[#2d2d2d] border border-[#3a3a3a] border-l-4 border-l-blue-500 rounded-lg p-5 mb-8 shadow-lg">
                      <h3 className="text-white font-semibold flex items-center gap-2 mb-2 text-sm">
                          <Flag size={16} className="text-blue-400 fill-blue-400" /> Current Objective
                      </h3>
                      <p className="text-gray-400 text-sm leading-6">
                          {currentLevel.hint}
                      </p>
                  </div>

                  {/* Available Commands */}
                  <div className="mb-8">
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                          <Keyboard size={14} /> Available Commands
                      </h3>
                      <div className="space-y-2.5">
                          {currentLevel.availableCommands?.map((cmd, idx) => (
                              <div key={idx} className="flex items-center group cursor-default">
                                  <kbd className="bg-[#3a3a3a] border border-[#4a4a4a] text-gray-200 px-3 py-1.5 rounded-lg font-mono text-sm min-w-[3rem] text-center font-semibold shadow-md group-hover:bg-[#454545] transition-colors">
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
                    className="w-full py-2.5 bg-[#3a3a3a] hover:bg-[#454545] text-blue-400 font-semibold rounded-lg border border-[#4a4a4a] transition-all flex items-center justify-center gap-2 text-sm shadow-md hover:shadow-lg"
                  >
                      <HelpCircle size={16} /> View Hint
                  </button>
              </div>
          </aside>

          {/* Right Area - Editor */}
          <section className="flex-1 flex flex-col relative bg-[#1e1e1e]">
             <VimEditor 
                state={gameState} 
                onKeyDown={handleKeyDown} 
                isFocused={isEditorFocused && !showCheatSheet && !showProfile}
                onFocus={() => setIsEditorFocused(true)}
             />
          </section>

      </main>

      {/* Level Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-[#2d2d2d] border-t border-[#1a1a1a] flex items-center px-4 gap-2 overflow-x-auto z-20">
        <div className="flex items-center gap-2 min-w-max">
          {LEVELS.map((level) => {
            const isCompleted = completedLevels.includes(level.id);
            const isCurrent = level.id === currentLevel.id;
            
            return (
              <button
                key={level.id}
                onClick={() => {
                  const newProgress = { ...progress, currentLevel: level.id };
                  setProgress(newProgress);
                  saveProgress(newProgress);
                }}
                className={`
                  relative flex items-center justify-center w-10 h-10 rounded-lg font-semibold text-sm transition-all cursor-pointer
                  ${isCurrent ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg scale-110' : ''}
                  ${isCompleted && !isCurrent ? 'bg-[#3a3a3a] text-green-400 hover:bg-[#454545] border border-[#4a4a4a]' : ''}
                  ${!isCurrent && !isCompleted ? 'bg-[#3a3a3a] text-gray-300 hover:bg-[#454545] border border-[#4a4a4a]' : ''}
                `}
                title={level.title}
              >
                {isCompleted && <span className="absolute -top-1 -right-1 text-xs">✓</span>}
                {level.id}
              </button>
            );
          })}
        </div>
        
        <div className="ml-auto flex items-center gap-2 text-xs text-gray-500">
          <span className="hidden sm:inline">Level {currentLevel.id} of {LEVELS.length}</span>
        </div>
      </div>
      
      {/* Level Complete Celebration */}
      {showLevelComplete && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="animate-bounce">
            <div className="bg-gradient-to-br from-green-400 to-green-600 text-white px-12 py-8 rounded-2xl shadow-2xl border-4 border-green-300">
              <div className="text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-4xl font-bold mb-2">Level Complete!</h2>
                <p className="text-xl opacity-90">Great job!</p>
              </div>
            </div>
          </div>
          
          {/* Confetti Effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-fall"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-10%',
                  animationDelay: `${Math.random() * 0.5}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              >
                <span className="text-2xl">
                  {['🎉', '✨', '🌟', '⭐', '💫'][Math.floor(Math.random() * 5)]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modals */}
      {showCheatSheet && <CheatSheet onClose={() => setShowCheatSheet(false)} />}
    </div>
  );
};

export default App;
