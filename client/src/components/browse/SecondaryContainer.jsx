import React from 'react';
import { useSelector } from 'react-redux';
import ShimmerUi from '../ShimmerUi';
import MovieList from './MovieList';

const SecondaryContainer = () => {
  const movies = useSelector((store) => store?.movies);

  if (!movies || !movies.nowPlayingMovies || !movies.nowPopular || !movies.topRated || !movies.upcoming) return <ShimmerUi />;

  return (
    <div className="bg-black">
      <div>
        <MovieList title={'Now Playing Movies'} movie={movies.nowPlayingMovies} />
        <MovieList title={'Popular Movies'} movie={movies.nowPopular} />
        <MovieList title={'Top Rated Movies'} movie={movies.topRated} />
        <MovieList title={'Upcoming Movies'} movie={movies.upcoming} />
      </div>
    </div>
  );
};

export default SecondaryContainer;