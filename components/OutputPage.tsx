
import React, { useMemo, useState } from 'react';
import { Entry } from '../types';

interface OutputPageProps {
  entries: Entry[];
  onAddNew: () => void;
  onClear: () => void;
  onLogout: () => void;
}

const CrownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 3.5a1.5 1.5 0 013 0V5h-3V3.5zM10 5h3l1.5 1.5L13 8h-3l-1.5-1.5L10 5zM7 5H4l1.5 1.5L7 8H4l-1.5-1.5L4 5zM2.5 9.5L4 11v3.5a1.5 1.5 0 003 0V11l1.5-1.5h5L16 11v3.5a1.5 1.5 0 003 0V11l1.5-1.5h-15z" />
    </svg>
);

const OutputPage: React.FC<OutputPageProps> = ({ entries, onAddNew, onClear, onLogout }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const rankedEntries = useMemo(() => {
    return [...entries]
      .sort((a, b) => b.sales - a.sales)
      .map((entry, index) => ({ ...entry, rank: index + 1 }));
  }, [entries]);

  const handleConfirmClear = () => {
    onClear();
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-700">
                Rank List
            </h1>
            <div className="flex items-center gap-2">
                <button onClick={onAddNew} className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow">Add New Entry</button>
                <button onClick={() => setIsModalOpen(true)} className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors shadow" disabled={entries.length === 0}>Clear Data</button>
                 <button onClick={onLogout} className="bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors shadow">Logout</button>
            </div>
        </header>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            {rankedEntries.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-600">
                        <thead className="text-xs text-white uppercase bg-blue-600">
                            <tr>
                                <th scope="col" className="px-6 py-3">Rank</th>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Guest</th>
                                <th scope="col" className="px-6 py-3">Sales</th>
                                <th scope="col" className="px-6 py-3">Report Sales</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rankedEntries.map((entry, index) => (
                                <tr
                                key={entry.id}
                                className={`border-b ${
                                    entry.rank === 1
                                    ? ''
                                    : index % 2 === 0
                                    ? 'bg-blue-50'
                                    : 'bg-red-50'
                                }`}
                                >
                                {entry.rank === 1 ? (
                                    <td colSpan={5} className="p-0">
                                        <div className="p-2 bg-gradient-to-r from-red-500 to-blue-500 rounded-t-lg shadow-[0_0_15px_rgba(239,68,68,0.5),_0_0_15px_rgba(59,130,246,0.5)]">
                                            <div className="bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-md text-white">
                                                <div className="flex items-center justify-center p-3 text-lg font-bold text-yellow-300">
                                                    <CrownIcon /> GRAND WINNER
                                                </div>
                                                <div className="grid grid-cols-5 text-center font-medium items-center p-4">
                                                    <div className="text-xl font-bold">{entry.rank}</div>
                                                    <div>{entry.name}</div>
                                                    <div>{entry.guest}</div>
                                                    <div className="text-lg text-green-400 font-bold">{entry.sales.toLocaleString()}</div>
                                                    <div>{entry.reportSales.toLocaleString()}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                ) : (
                                    <>
                                    <td className="px-6 py-4 font-bold text-gray-900">{entry.rank}</td>
                                    <td className="px-6 py-4 font-semibold">{entry.name}</td>
                                    <td className="px-6 py-4">{entry.guest}</td>
                                    <td className="px-6 py-4 font-bold text-green-700">{entry.sales.toLocaleString()}</td>
                                    <td className="px-6 py-4">{entry.reportSales.toLocaleString()}</td>
                                    </>
                                )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center p-12 text-gray-500">
                    <p className="font-semibold text-lg">No data available.</p>
                    <p>Click "Add New Entry" to get started.</p>
                </div>
            )}
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Clear All Data
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete all entries? This action is permanent and cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={handleConfirmClear}
              >
                Confirm Clear
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OutputPage;
