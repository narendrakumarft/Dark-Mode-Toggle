import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next"

// Main App component that manages the dark/light theme state
function App() {
  // Initialize state based on system preference
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  // Synchronize the React state with the HTML DOM class list
  useEffect(() => {
    // We still toggle the class on HTML for global styles (like scrollbars)
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Handler to toggle between light and dark modes
  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  return (
    <>
      <div 
        className={`h-screen w-full flex items-center justify-center flex-col gap-6 transition-colors duration-500 ease-in-out 
        ${theme === 'dark' ? 'bg-gray-950 text-gray-100' : 'bg-white text-gray-800'}`}
      >
        
        {/* Theme Toggle Button */}
        <button 
          onClick={toggleTheme} 
          className={`rounded-full p-4 shadow-lg shadow-purple-500/30 cursor-pointer transition-all hover:scale-110 active:scale-95
          ${theme === 'dark' 
            ? 'bg-gray-800 text-gray-300 hover:text-purple-400' 
            : 'bg-gray-100 text-gray-600 hover:text-purple-500'
          }`}
          aria-label="Toggle Dark Mode"
        >
          {theme === "light" ? <Moon size={32} /> : <Sun size={32} />}
        </button>

        <div className="text-3xl font-bold tracking-tight">
          {theme === "light" ? "Welcome to Bright Mode ☀️" : "Welcome to the Dark Side 🌙"}
        </div>
        
        <p className="opacity-60 text-sm font-medium uppercase tracking-widest">
          {theme === "light" ? "Light" : "Dark"}
        </p>
      </div>
    </>
  );
}

export default App;