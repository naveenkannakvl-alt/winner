
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Entry } from '../types';

interface InputPageProps {
  onSave: (newEntry: Omit<Entry, 'id' | 'location'>) => void;
  allEntries: Entry[];
  onShowRankings: () => void;
  onLogout: () => void;
  location: string;
}

const InputPage: React.FC<InputPageProps> = ({ onSave, allEntries, onShowRankings, onLogout, location }) => {
  const [name, setName] = useState('');
  const [guest, setGuest] = useState('');
  const [sales, setSales] = useState('');
  const [reportSales, setReportSales] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSuggestionsVisible, setSuggestionsVisible] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);

  const existingNames = useMemo(() => {
    return [...new Set(allEntries.map(e => e.name))];
  }, [allEntries]);

  useEffect(() => {
    if (name) {
      const filteredSuggestions = existingNames
        .filter(n => n.toLowerCase().includes(name.toLowerCase()))
        .slice(0, 5);
      setSuggestions(filteredSuggestions);
      setSuggestionsVisible(filteredSuggestions.length > 0);
    } else {
      setSuggestions([]);
      setSuggestionsVisible(false);
    }
  }, [name, existingNames]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (nameInputRef.current && !nameInputRef.current.contains(event.target as Node)) {
            setSuggestionsVisible(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && guest && sales && reportSales) {
      onSave({
        name,
        guest: parseInt(guest, 10),
        sales: parseInt(sales, 10),
        reportSales: parseInt(reportSales, 10),
      });
    } else {
      alert("Please fill all fields.");
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setName(suggestion);
    setSuggestions([]);
    setSuggestionsVisible(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
       <header className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-red-600">
                Data Entry <span className="text-sm font-medium text-gray-500">({location})</span>
            </h1>
            <div>
                <button onClick={onShowRankings} className="mr-2 text-sm bg-blue-100 text-blue-700 font-semibold py-2 px-4 rounded-lg hover:bg-blue-200 transition-colors">View Ranks</button>
                <button onClick={onLogout} className="text-sm bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">Logout</button>
            </div>
        </header>

      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8 border-t-4 border-red-500">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative" ref={nameInputRef}>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => name && suggestions.length > 0 && setSuggestionsVisible(true)}
              autoComplete="off"
              className="mt-1 block w-full px-3 py-2 bg-white border border-blue-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
            />
            {isSuggestionsVisible && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-40 overflow-y-auto">
                {suggestions.map((s, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick(s)}
                    className="px-4 py-2 cursor-pointer hover:bg-red-100"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="guest" className="block text-sm font-medium text-gray-700">Guest</label>
              <input
                type="number"
                id="guest"
                value={guest}
                onChange={(e) => setGuest(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-blue-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="sales" className="block text-sm font-medium text-gray-700">Sales</label>
              <input
                type="number"
                id="sales"
                value={sales}
                onChange={(e) => setSales(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-blue-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="report-sales" className="block text-sm font-medium text-gray-700">Report Sales</label>
              <input
                type="number"
                id="report-sales"
                value={reportSales}
                onChange={(e) => setReportSales(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-blue-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              />
            </div>
          </div>
          
          <div className="pt-4">
             <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-gradient-to-r from-red-500 to-blue-600 hover:from-red-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300 transform hover:scale-105"
            >
              Save / Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputPage;
