import React from 'react';
import { useSelector } from 'react-redux';
import ShimmerUi from './ShimmerUi';
import MovieList from './MovieList';

const GptSearchResults = () => {
  const { movieName, movieResult } = useSelector((store) => store.gpt);

  // Ensure movieResult is an array and not empty
  // if (!movieResult || movieResult.length === 0) {
  //   return <ShimmerUi />;
  // }

  return (
    <div className="xl:px-16 md:px-8 sm:px-4 px-1.5 lg:px-12 ">
      {movieResult?.map((movie, index) => (
        <div key={movie.id} className="mb-4">
          <h3 className="text-lg font-semibold">{movie.title}</h3>
          {movie.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-32 h-auto mt-2"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default GptSearchResults;
