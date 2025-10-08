
import React, { useState } from 'react';

interface LoginPageProps {
  onLogin: (location: string) => void;
}

const locations = ["Pattukkottai", "Thanjavur", "Mannargudi", "Chidambaram"];

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [selectedLocation, setSelectedLocation] = useState<string>(locations[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedLocation) {
      onLogin(selectedLocation);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-600 via-red-500 to-blue-700 p-4">
      <div className="w-full max-w-md bg-black bg-opacity-30 backdrop-blur-lg rounded-xl shadow-2xl p-8 border border-white border-opacity-20">
        <h1 className="text-4xl font-bold text-center text-white mb-8 drop-shadow-lg">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-200 mb-2">
              Select Your Location
            </label>
            <select
              id="location"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 bg-opacity-50 text-white border border-blue-400 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-300"
            >
              {locations.map((loc) => (
                <option key={loc} value={loc} className="bg-gray-800">
                  {loc}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50 transform hover:scale-105 transition-transform duration-300 shadow-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
