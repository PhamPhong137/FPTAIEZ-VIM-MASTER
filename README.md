# 🎮 VIM Master - Interactive VIM Learning Platform

<div align="center">

**Master VIM commands through interactive lessons and hands-on practice**

[![React](https://img.shields.io/badge/React-19.2.3-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38bdf8.svg)](https://tailwindcss.com/)

</div>

---

## 📖 About

VIM Master is an interactive web application designed to help developers learn and master VIM text editor commands through gamified lessons. With 20 progressive levels, real-time feedback, and a beautiful macOS-inspired interface, learning VIM has never been more engaging.

## ✨ Features

### 🎯 Interactive Learning
- **20 Progressive Levels**: From basic movement to advanced editing techniques
- **Real-time Feedback**: Instant validation of your VIM commands
- **Hands-on Practice**: Learn by doing in a safe, simulated environment
- **Level Completion Tracking**: Visual progress indicators and achievements

### 🎨 Beautiful UI/UX
- **macOS-Inspired Design**: Clean, modern interface with traffic lights and native feel
- **Dark Mode**: Easy on the eyes for extended learning sessions
- **Smooth Animations**: Celebration effects when completing levels
- **Responsive Layout**: Works seamlessly on desktop and mobile devices

### 📚 Comprehensive Resources
- **Command Reference**: Full VIM cheatsheet with search functionality
- **Categorized Commands**: Organized by Movement, Editing, Search, Visual Mode, and more
- **Contextual Hints**: Level-specific guidance and available commands
- **Quick Access**: Keyboard shortcuts for instant help (Ctrl+/)

### 🎮 Gamification
- **Progress Tracking**: See how many levels you've completed
- **Badge System**: Earn achievements for milestones
- **Level Navigation**: Jump to any unlocked level freely
- **Celebration Animations**: Confetti and animations on level completion

### 💾 Data Management
- **Local Storage**: Progress saved automatically in your browser
- **Export/Import**: Transfer your progress between devices
- **Profile System**: Track your stats and achievements
- **Reset Option**: Start fresh anytime

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/vim-master.git
   cd vim-master
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   Navigate to http://localhost:3000
   ```

### Build for Production

```bash
npm run build
npm run preview
```

## 🎓 Learning Path

### Beginner Levels (1-5)
- Basic movement (h, j, k, l)
- Word navigation (w, b, e)
- Line jumps (0, $, gg, G)
- Insert mode basics
- Line deletion (dd)

### Intermediate Levels (6-13)
- Text manipulation (cw, D, r)
- Undo/Redo (u, Ctrl+r)
- Search functionality (/, n, N)
- Append operations (A, a)
- Line operations (o, O, J)
- Copy/Paste (yy, p)

### Advanced Levels (14-20)
- Visual mode (v, V)
- Character finding (f{char})
- Bracket matching (%)
- Complex editing scenarios
- Real-world code fixes

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2.3
- **Language**: TypeScript 5.8.2
- **Build Tool**: Vite 6.2.0
- **Styling**: Tailwind CSS (via CDN)
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useEffect, useCallback)

## 📁 Project Structure

```
vim-master/
├── src/
│   ├── components/
│   │   ├── VimEditor.tsx      # Main VIM editor simulation
│   │   ├── CheatSheet.tsx     # Command reference modal
│   │   ├── Profile.tsx        # User profile and stats
│   │   └── ...
│   ├── utils/
│   │   ├── vimEngine.ts       # VIM command processing logic
│   │   └── storage.ts         # LocalStorage management
│   ├── constants.ts           # Level definitions and data
│   ├── types.ts              # TypeScript type definitions
│   ├── App.tsx               # Main application component
│   └── index.tsx             # Application entry point
├── index.html                # HTML template
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite configuration
└── README.md                 # This file
```

## 🎮 How to Use

1. **Start with Level 1**: Learn basic VIM movements
2. **Read the Objective**: Understand what you need to accomplish
3. **Use Available Commands**: Try the suggested commands
4. **Complete the Goal**: Move cursor or edit text as instructed
5. **Celebrate**: Enjoy the completion animation!
6. **Progress**: Move to the next level or jump to any unlocked level

### Keyboard Shortcuts

- `Ctrl + /` - Toggle cheat sheet
- `Esc` - Return to normal mode (in VIM editor)
- All standard VIM commands work in the editor!

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Add more levels
- Improve documentation
- Submit pull requests

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by VIM, the legendary text editor
- Built with modern web technologies
- Designed for developers, by developers

## 📧 Contact

For questions, suggestions, or feedback, please open an issue on GitHub.

---

<div align="center">

**Happy VIM Learning! 🚀**

Made with ❤️ for the developer community

</div>
