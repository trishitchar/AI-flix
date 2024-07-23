import React from 'react'
import { useSelector } from 'react-redux'

const MainContainer = () => {
    const movies = useSelector(state => state.movies?.nowPlayingMovies);
    if(!movies) return ;

    const mainMovie = movies[0];
    console.log(mainMovie)
  return (
    <div>MainContainer</div>
  )
}

export default MainContainer