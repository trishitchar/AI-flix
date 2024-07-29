import React from 'react';
import MovieList from './MovieList';
import { useSelector } from 'react-redux';
import ShimmerUi from './ShimmerUi';

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