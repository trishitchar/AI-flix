import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'; 
import { USER_API_END_POINT } from '../../utils/constants';
import { addLikedVideo, removeLikedVideo } from '../../redux/userSlice';

const MovieStats = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Redux state
    const info = useSelector((state) => state.movies.movieInfo);
    const email = useSelector((state) => state.user.user.email);
    const key = useSelector((state) => state.movies.nowTrailer.key);
    const likedVideos = useSelector((state) => state.user.likedVideos || []);

    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        if (key) {
            setIsLiked(likedVideos.includes(key));
        }
    }, [key, likedVideos]);

    const handleLikeDislike = async () => {
        if (!email || !key) {
            console.error("Email or key is missing");
            toast.error("Error: Email or video ID is missing.");
            return;
        }

        const action = isLiked ? 'dislike' : 'like';
        try {
            const response = await axios.post(`${USER_API_END_POINT}/likedVideo`, { email, liked: key, action });

            if (response.data.success) {
                if (isLiked) {
                    dispatch(removeLikedVideo(key));
                } else {
                    dispatch(addLikedVideo(key));
                }
                setIsLiked(!isLiked);
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error toggling the video:", error);
            toast.error("Failed to toggle the video.");
        }
    };

    const goToBrowse = () => {
        navigate("/browse");
    };

    if (!info) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <div className="flex justify-around items-center bg-white py-4">
                <button
                    className={`m-2 p-2 text-white font-bold rounded-md ${isLiked ? 'bg-red-600' : 'bg-gray-900'}`}
                    onClick={handleLikeDislike}
                >
                    {isLiked ? "❌ Dislike the Video" : "❤ Like The Video"}
                </button>
                <button
                    className="m-2 p-2 text-white bg-gray-900 font-bold rounded-md"
                    onClick={goToBrowse}
                >
                    Go to Home
                </button>
            </div>

            <div className="container mx-auto p-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="w-full md:w-2/3 lg:w-3/5">
                        <h1 className="text-4xl font-bold mb-4">{info.title}</h1>
                        <p className="text-lg mb-6">{info.overview}</p>
                        <div className="mb-6">
                            <span className="text-lg font-semibold">Release Date:</span> {info.release_date}
                        </div>
                        <div className="mb-6">
                            <span className="text-lg font-semibold">Runtime:</span> {info.runtime} minutes
                        </div>
                        <div className="mb-6">
                            <span className="text-lg font-semibold">Genres:</span> {info.genres?.map((genre) => genre.name).join(', ') || 'N/A'}
                        </div>
                        <div className="mb-6">
                            <span className="text-lg font-semibold">Tagline:</span> {info.tagline || 'N/A'}
                        </div>
                        <div className="mb-6">
                            <span className="text-lg font-semibold">Budget:</span> ${info.budget?.toLocaleString() || 'N/A'}
                        </div>
                        <div className="mb-6">
                            <span className="text-lg font-semibold">Revenue:</span> ${info.revenue?.toLocaleString() || 'N/A'}
                        </div>
                        <div className="mb-6">
                            <span className="text-lg font-semibold">Vote Average:</span> {info.vote_average} ({info.vote_count} votes)
                        </div>
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
        </div>
    );
};

// PropTypes for type-checking
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
    email: PropTypes.string,
    key: PropTypes.string,
    likedVideos: PropTypes.arrayOf(PropTypes.string),
};

export default MovieStats;
