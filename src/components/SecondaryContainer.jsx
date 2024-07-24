import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'
import ShimmerUi from './ShimmerUi';

const SecondaryContainer = () => {
  const movies = useSelector((store) => store?.movies);

  if (!movies || !movies.nowPlayingMovies) return <ShimmerUi />;

  return (
    <div className="bg-black">
      <div>
        <MovieList title={'Now Playing'} movie={movies.nowPlayingMovies} />
      </div>
    </div>
  );
};

export default SecondaryContainer;