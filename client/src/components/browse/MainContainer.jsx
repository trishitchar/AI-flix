import React from 'react'
import { useSelector } from 'react-redux'
import VideoBackground from './VideoBackground';
import VideoTitle from './VideoTitle';


const MainContainer = () => {
    const movies = useSelector(state => state.movies?.nowPlayingMovies);
    if(!movies) return ;
    // console.log("lol"+movies)

    const mainMovie = movies[0];
    const { original_title, overview, id } = mainMovie;
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <VideoBackground movieId={id} />
      <VideoTitle original_title={original_title} overview={overview} movieId={id} />
    </div>
  )
}

export default MainContainer