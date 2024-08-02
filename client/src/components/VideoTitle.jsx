import React from 'react';
import { Link } from 'react-router-dom';

const VideoTitle = ({ original_title, overview, movieId }) => {

  return (
<div className="absolute top-0 left-0 w-full h-full z-10 overflow-hidden">
      <div className="flex flex-col justify-end h-full p-4 sm:p-8 md:p-16 lg:p-24 from-black to-transparent bg-gradient-to-t">
        <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          {original_title}
        </h1>
        <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg mb-6 max-w-2xl">
          {overview.length > 200 ? `${overview.slice(0, 200)}...` : overview}
        </p>
        <div className="flex space-x-2 sm:space-x-4">
          <Link to={`/movieinfo/${movieId}`}
            className="bg-white text-black py-1 px-2 sm:py-2 sm:px-4 md:py-2 md:px-6 rounded flex items-center hover:bg-opacity-80 transition duration-300"
          >
            <i className="ri-play-fill mr-2"></i>
            Play Now
          </Link>
          <Link
            to={`/movieinfo/${movieId}`}
            className="bg-gray-500 bg-opacity-50 text-white py-1 px-2 sm:py-2 sm:px-4 md:py-2 md:px-6 rounded flex items-center hover:bg-opacity-70 transition duration-300"
          >
            <i className="ri-information-line mr-2"></i>
            More Info
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;