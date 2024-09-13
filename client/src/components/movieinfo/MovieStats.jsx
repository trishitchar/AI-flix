import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toggleLikedVideo } from '../../redux/userActions';
import { useCallback } from 'react';

const MovieStats = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Redux state
    const info = useSelector((state) => state.movies.movieInfo);
    const email = useSelector((state) => state.user.user?.email);
    const key = useSelector((state) => state.movies.nowTrailer?.key);
    const likedVideos = useSelector((state) => state.user.likedVideos || []);

    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        setIsLiked(key ? likedVideos.includes(key) : false);
    }, [key, likedVideos]);

    const handleLikeDislike = useCallback(async () => {
        if (!email || !key) {
            toast.error("Error: Email or video ID is missing.");
            return;
        }

        const action = isLiked ? 'dislike' : 'like';
        try {
            const result = await dispatch(toggleLikedVideo(email, key, action));
            if (result.success) {
                setIsLiked(!isLiked); 
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.error("Error toggling the video:", error);
            toast.error("Failed to toggle the video.");
        }
    }, [dispatch, email, isLiked, key]);

    const goToBrowse = () => {
        navigate("/browse");
    };

    if (!info) {
        return <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Header isLiked={isLiked} onLikeDislike={handleLikeDislike} onGoHome={goToBrowse} />
            <MovieDetails info={info} />
        </div>
    );
};

const Header = ({ isLiked, onLikeDislike, onGoHome }) => (
    <div className="flex justify-around items-center bg-white py-4">
        <button
            className={`m-2 p-2 text-white font-bold rounded-md ${isLiked ? 'bg-red-600' : 'bg-gray-900'}`}
            onClick={onLikeDislike}
        >
            {isLiked ? "❌ Dislike the Video" : "❤ Like The Video"}
        </button>
        <button
            className="m-2 p-2 text-white bg-gray-900 font-bold rounded-md"
            onClick={onGoHome}
        >
            Go to Home
        </button>
    </div>
);

const MovieDetails = ({ info }) => (
    <div className="container mx-auto p-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="w-full md:w-2/3 lg:w-3/5">
                <h1 className="text-4xl font-bold mb-4">{info.title}</h1>
                <p className="text-lg mb-6">{info.overview}</p>
                <MovieInfo label="Release Date" value={info.release_date} />
                <MovieInfo label="Runtime" value={`${info.runtime} minutes`} />
                <MovieInfo label="Genres" value={info.genres?.map((genre) => genre.name).join(', ') || 'N/A'} />
                <MovieInfo label="Tagline" value={info.tagline || 'N/A'} />
                <MovieInfo label="Budget" value={`$${info.budget?.toLocaleString() || 'N/A'}`} />
                <MovieInfo label="Revenue" value={`$${info.revenue?.toLocaleString() || 'N/A'}`} />
                <MovieInfo label="Vote Average" value={`${info.vote_average} (${info.vote_count} votes)`} />
                <div className="mb-6">
                    <span className="text-lg font-semibold">For More Information: visit IMDB:</span> 
                    <a 
                        href={`https://www.imdb.com/title/${info.imdb_id}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-400 underline"
                    >
                        {info.imdb_id}
                    </a>
                </div>
            </div>
            <div className="w-full md:w-1/3 lg:w-2/5 flex justify-center">
                <img 
                    src={`https://image.tmdb.org/t/p/w500${info.poster_path}`} 
                    alt={info.title} 
                    className="rounded-lg shadow-lg border border-gray-700" 
                />
            </div>
        </div>
    </div>
);

const MovieInfo = ({ label, value }) => (
    <div className="mb-6">
        <span className="text-lg font-semibold">{label}:</span> {value}
    </div>
);

MovieStats.propTypes = {
    info: PropTypes.shape({
        title: PropTypes.string.isRequired,
        overview: PropTypes.string.isRequired,
        release_date: PropTypes.string.isRequired,
        runtime: PropTypes.number.isRequired,
        genres: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired
        })).isRequired,
        tagline: PropTypes.string,
        budget: PropTypes.number,
        revenue: PropTypes.number,
        vote_average: PropTypes.number.isRequired,
        vote_count: PropTypes.number.isRequired,
        imdb_id: PropTypes.string.isRequired,
        poster_path: PropTypes.string.isRequired,
    }),
};

export default MovieStats;
