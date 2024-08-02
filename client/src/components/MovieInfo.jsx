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
            <h1>{info.title}</h1>
            <p>{info.overview}</p>
            <MovieStats movieId={id}/>
            <img src={`https://image.tmdb.org/t/p/w500${info.poster_path}`} alt={info.title} />
        </div>
    );
};

export default MovieInfo;
