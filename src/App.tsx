import { GameBoard } from './components/GameBoard';
import { ThemeProvider } from './contexts/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-theme-primary theme-transition flex flex-col">
        {/* Header with theme toggle */}
        <header className="w-full flex justify-end p-4">
          <ThemeToggle />
        </header>
        
        {/* Main game area */}
        <main className="flex-1 flex items-center justify-center py-12">
          <GameBoard />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
