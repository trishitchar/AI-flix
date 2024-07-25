import React from 'react';

const ShimmerCard = () => {
  return (
    <div className="flex flex-col items-center gap-2 animate-pulse">
      <div className="w-36 h-48 bg-gray-700 rounded-md"></div>
      <div className="w-24 h-4 bg-gray-700 rounded-md"></div>
    </div>
  );
};

export default ShimmerCard;
