import React, { useState } from 'react'
import useMovieTrailer from '../hooks/useMovieTrailer'
import { useSelector } from 'react-redux';

const VidioBackground = ({ movieId }) => {
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
        <div className="w-screen overflow-hidden"
             onMouseEnter={handleMouseEnter}
             onMouseLeave={handleMouseLeave}>
            <div className="">
                <iframe
                    className="w-screen aspect-[16/9]"
                    src={
                        "https://www.youtube.com/embed/" +
                        trailer?.key +
                        "?autoplay=1&mute=1&controls=0&modestbranding=1"
                    }
                    title="YouTube video player"
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                ></iframe>
            </div>
            {hovering && (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    {/* Additional overlay or UI elements on hover can go here */}
                </div>
            )}
        </div>
    );
}

export default VidioBackground;