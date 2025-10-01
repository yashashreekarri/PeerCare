import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">
          Welcome to React + TypeScript + Tailwind + Vite
        </h1>
        <p className="text-gray-600 text-center">
          Your lightning-fast development environment is ready! Start building amazing things.
        </p>
        <div className="mt-6 flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;