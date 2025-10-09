# 🧠 Memory Game (Concentration)

Flip cards to find matching pairs in this modern Memory/Concentration game. Sharpen your recall with increasing challenge, smooth animations, and a clean UI.

[![Vite](https://img.shields.io/badge/Vite-5.0+-646CFF.svg)](https://vitejs.dev)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E.svg)](https://javascript.info)
[![HTML5](https://img.shields.io/badge/HTML5-Semantics-E34F26.svg)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-Modern-1572B6.svg)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 🌟 Features

- **Card flip animations** and polished transitions
- **Match detection** with feedback and scoring/move count
- **Adjustable grid sizes** for difficulty (e.g., 4×4, 6×6)
- **Timer and best time** tracking (optional localStorage)
- **Responsive UI** for desktop and mobile
- **Accessible controls** (keyboard and touch friendly)

## 🛠️ Technology Stack

- **Build Tool**: Vite 5.0+
- **Frontend**: Vanilla JavaScript (ES6+)
- **UI**: Semantic HTML + modern CSS
- **Dev Experience**: Hot Module Replacement (HMR)

## 📋 Prerequisites

- Node.js 18.0 or higher
- npm, yarn, or pnpm

## 🚀 Quick Start

```bash
git clone https://github.com/debugfest/memory-game.git
cd memory-game

# install deps
npm install

# start dev server
npm run dev

# open the URL from the terminal (usually http://localhost:5173)
```

## 📁 Project Structure

```
memory-game/
├── public/                 # Static assets
├── src/                    # Source code
│   ├── css/                # Styles
│   ├── js/                 # Game logic (deck, flips, matches)
│   └── main.js             # App entry
├── index.html              # Main HTML
├── package.json            # Scripts and deps
├── vite.config.js          # Vite config (optional)
└── Readme.md               # This file
```

## 🎮 How to Play

### Controls
- Click or tap two cards to flip them
- Keyboard (optional): Use arrow keys to move focus, Enter/Space to flip

### Rules
1. Flip two cards at a time to find matching pairs.
2. Matched pairs stay face-up; unmatched flip back after a short delay.
3. Clear the board with the fewest moves or in the fastest time.

## 🔧 Development


## 🤝 Contributing

Contributions are welcome! Feel free to propose new themes, difficulty modes, animations, or accessibility improvements.

---

<div align="center">

**⭐ If you enjoy this project, please give it a star! ⭐**

Made with ❤️ — Enjoy training your memory!

</div>