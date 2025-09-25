import React, { useState, useEffect } from 'react';
import { UserDashboard } from './components/UserDashboard';
import { GovernmentDashboard } from './components/GovernmentDashboard';
import { LoginPage } from './components/LoginPage'; // import login page
import { LanguageProvider } from './contexts/LanguageContext';
import { Button } from './components/ui/button';
import { Users, Building2, Moon, Sun } from 'lucide-react';

export default function App() {
  const [currentDashboard, setCurrentDashboard] = useState<'login' | 'user' | 'government'>('login'); // default to login
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // login handler
  const handleLogin = (userType: 'user' | 'government') => {
    setCurrentDashboard(userType);
  };

  return (
    <LanguageProvider>
      {currentDashboard === 'login' ? (
        <LoginPage
          onLogin={handleLogin}
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
        />
      ) : currentDashboard === 'user' ? (
        <UserDashboard
          onSwitchDashboard={setCurrentDashboard}
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
        />
      ) : (
        <GovernmentDashboard
          onSwitchDashboard={setCurrentDashboard}
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
        />
      )}
    </LanguageProvider>
  );
}