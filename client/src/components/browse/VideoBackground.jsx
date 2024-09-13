import React, { useState } from 'react'
import useMovieTrailer from '../../hooks/useMovieTrailer'
import { useSelector } from 'react-redux';
import LazyLoad from 'react-lazyload';

const VideoBackground = ({ movieId }) => {
    useMovieTrailer(movieId);
    const trailer = useSelector(state => state.movies?.nowTrailer);
    const [hovering, setHovering] = useState(false);

    if (!trailer) return null;

    const handleMouseEnter = () => {
        setHovering(true);
    };

    const handleMouseLeave = () => {
        setHovering(false);
    };

    return (
        <div
        className="w-screen overflow-hidden overflow-x-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="overflow-hidden">
          <LazyLoad>
            <iframe
              className="w-screen h-screen md:h-auto md:aspect-[16/9]"
              src={
                "https://www.youtube-nocookie.com/embed/" +
                trailer?.key +
                "?autoplay=1&mute=1&controls=0&modestbranding=1"
              }
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              ></iframe>
            </LazyLoad>
        </div>
        {hovering && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            {/* Additional overlay or UI elements on hover can go here */}
          </div>
        )}
      </div>
    );
  };

export default VideoBackground