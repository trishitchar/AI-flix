import React from 'react'
import { useSelector } from 'react-redux'
import VidioBackground from './VideoBackground';
import VideoTitle from './VideoTitle';

const MainContainer = () => {
  const movies = useSelector(state => state.movies?.nowPlayingMovies);
  
  if (!movies) return null;

  const mainMovie = movies[0]; // Assuming first movie is the main movie

  return (
      <div className="relative">
          <div className="overflow-hidden">
              <VidioBackground movieId={mainMovie.id} />
          </div>
          <div className="absolute top-0">
              <VideoTitle original_title={mainMovie.original_title} overview={mainMovie.overview} />
          </div>
      </div>
  );
}

export default MainContainer;