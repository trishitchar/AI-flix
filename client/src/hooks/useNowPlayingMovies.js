import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../redux/moviesSlice";

const useNowPlayingMovies = () => {
    const dispatch = useDispatch();

    const fetchMovies = async () => {
        try {
            const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?&page=1', API_OPTIONS);
            const jsonData = await response.json();
            
            dispatch(addNowPlayingMovies(jsonData.results));
        } catch (error) {
            console.error("Error fetching now playing movies:", error);
        }
    }

    useEffect(() => {
        fetchMovies();
    }, [dispatch]); 
}

export default useNowPlayingMovies;