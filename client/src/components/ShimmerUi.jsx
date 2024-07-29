import React from 'react';
import ShimmerCard from './ShimmerCard';

const ShimmerUi = () => {
  // Define the number of shimmer cards you want to display
  const numberOfCards = 10;

  return (
    <div className="bg-black py-6 ">
      <div className="text-white text-start mb-4 lg:text-4xl md:text-3xl sm:text-base text-base font-semibold md:pl-3 pl-2 lg:pl-4">
        Loading...
      </div>
      <div className="flex gap-6 overflow-x-auto no-scrollbar pb-6">
        {Array.from({ length: numberOfCards }).map((_, index) => (
          <ShimmerCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default ShimmerUi;
