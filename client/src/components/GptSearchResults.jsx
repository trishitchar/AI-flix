import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const GptSearchResults = () => {
  const { movieResult } = useSelector((store) => store.gpt);
  const navigate = useNavigate();

  // Ensure movieResult is an array and not empty
  // if (!movieResult || movieResult.length === 0) {
  //   return <ShimmerUi />;
  // }

  const handleMovieClick = (movieId) => {
    navigate(`/movieinfo/${movieId}`); // Navigate to the movie info page
  };

  return (
    <div className="xl:px-16 md:px-8 sm:px-4 px-1.5 lg:px-12 flex flex-wrap ">
      {movieResult.map((movie) => (
        <div
          key={movie.id}
          className="mb-4 p-3 hover:cursor-pointer hover:scale-110"
          onClick={() => handleMovieClick(movie.id)}
        >
          {movie.poster_path && (
            <>
              <span className="text-lg font-semibold text-gray-300 hidden md:block lg:text-xl md:text-sm">
                {movie.title?.length > 18 ? `${movie.title.slice(0, 18)}...` : movie.title}
              </span>
              <span className="text-gray-300 md:hidden sm:text-sm text-xs">
                {movie.title?.length > 12 ? `${movie.title.slice(0, 12)}...` : movie.title}
              </span>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-32 h-auto mt-2"
              />
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default GptSearchResults;
