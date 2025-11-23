import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-200 rounded-full opacity-25"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center text-indigo-600 font-serif font-bold text-xl animate-pulse">
          ∑
        </div>
      </div>
      <p className="text-slate-500 text-sm animate-pulse">Consulting the archives...</p>
    </div>
  );
};

export default LoadingSpinner;
