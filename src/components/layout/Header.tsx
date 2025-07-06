import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Settings, Moon, Sun } from 'lucide-react';
import SearchBar from '../common/SearchBar';

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // TODO: Implement global search functionality
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // TODO: Implement dark mode toggle
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">WP</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Work Planner</h1>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-1">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Dashboard
            </Link>
            <Link 
              to="/board" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/board') 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Board
            </Link>
            <Link 
              to="/calendar" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/calendar') 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Kalender
            </Link>
            <Link 
              to="/projects" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/projects') 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Projekte
            </Link>
          </nav>

          <div className="flex items-center space-x-2">
            {showSearch ? (
              <div className="w-64">
                <SearchBar
                  placeholder="Projekte und Aufgaben suchen..."
                  onSearch={handleSearch}
                />
              </div>
            ) : (
              <button 
                onClick={() => setShowSearch(true)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Suchen"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
            
            <button 
              onClick={toggleDarkMode}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title={darkMode ? 'Light Mode' : 'Dark Mode'}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      {showSearch && (
        <div className="md:hidden px-6 pb-4">
          <SearchBar
            placeholder="Projekte und Aufgaben suchen..."
            onSearch={handleSearch}
          />
        </div>
      )}
    </header>
  );
};

export default Header;