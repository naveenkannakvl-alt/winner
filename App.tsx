
import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import InputPage from './components/InputPage';
import OutputPage from './components/OutputPage';
import { Page, Entry } from './types';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [currentPage, setCurrentPage] = useLocalStorage<Page>('sales-app-page', Page.Login);
  const [location, setLocation] = useLocalStorage<string>('sales-app-location', '');
  const [entries, setEntries] = useLocalStorage<Entry[]>('sales-entries', []);

  const handleLogin = (selectedLocation: string) => {
    setLocation(selectedLocation);
    setCurrentPage(Page.Input);
  };

  const handleSave = (newEntryData: Omit<Entry, 'id' | 'location'>) => {
    const newEntry: Entry = {
      ...newEntryData,
      id: new Date().toISOString(),
      location: location,
    };
    setEntries([...entries, newEntry]);
    setCurrentPage(Page.Output);
  };
  
  const handleClear = () => {
    setEntries([]);
  };
  
  const handleLogout = () => {
      setLocation('');
      setCurrentPage(Page.Login);
  }

  const renderPage = () => {
    switch (currentPage) {
      case Page.Input:
        return <InputPage onSave={handleSave} allEntries={entries} onShowRankings={() => setCurrentPage(Page.Output)} onLogout={handleLogout} location={location} />;
      case Page.Output:
        return <OutputPage entries={entries} onAddNew={() => setCurrentPage(Page.Input)} onClear={handleClear} onLogout={handleLogout} />;
      case Page.Login:
      default:
        return <LoginPage onLogin={handleLogin} />;
    }
  };

  return (
    <main className="min-h-screen w-full font-sans">
      {renderPage()}
    </main>
  );
}

export default App;
