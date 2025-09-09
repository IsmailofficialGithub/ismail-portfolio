import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 animate-pulse">
          <div className="w-full h-48 bg-gray-800"></div>
          <div className="p-6 space-y-4">
            <div className="h-6 bg-gray-800 rounded w-3/4"></div>
            <div className="h-4 bg-gray-800 rounded w-full"></div>
            <div className="flex gap-2">
              <div className="h-6 bg-gray-800 rounded w-16"></div>
              <div className="h-6 bg-gray-800 rounded w-16"></div>
            </div>
            <div className="flex gap-2 pt-4">
              <div className="h-8 bg-gray-800 rounded w-8"></div>
              <div className="h-8 bg-gray-800 rounded w-8"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
