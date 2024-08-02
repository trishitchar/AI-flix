import React from 'react';
import { useParams } from 'react-router-dom';
import useMovieInfo from '../hooks/useMovieInfo';
import { useSelector } from 'react-redux';
import VideoBackground from './VideoBackground';
import MovieStats from './MovieStats';

const MovieInfo = () => {
    const { id } = useParams();
    useMovieInfo(id);

    const info = useSelector((state) => state.movies.movieInfo);

    if (!info) return <div>Loading...</div>;

    return (
        <div>
            <VideoBackground movieId={id}/>
            <MovieStats movieId={id}/>
        </div>
    );
};

export default MovieInfo;
