import React from 'react'
import ShimmerUi from './ShimmerUi'
import { Link } from "react-router-dom";
import MovieCard from './MovieCard';

const MovieList = ({ title, movie }) => {
  if (!movie) return <ShimmerUi />;

  return (
    <div className=''>
    <span className="lg:text-2xl md:text-xl sm:text-base text-base font-semibold md:pl-3 pl-2 lg:pl-4 text-white">
      {title}
    </span>
    <div className="flex overflow-x-auto mt-4 space-x-4 p-2" style={{ overflowY: 'hidden' }}>
      {movie.map((movieItem) => (
        <Link to={`/movieinfo/${movieItem.id}`} key={movieItem.id}>
          <MovieCard
            key={movieItem.id}
            poster={movieItem.poster_path || movieItem.profile_path}
            title={movieItem.title || movieItem.original_name}
          />
        </Link>
      ))}
    </div>
  </div>
);
};

export default MovieList;