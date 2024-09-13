import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTopRated } from "../redux/moviesSlice";
import { useEffect } from "react";

const useTopRated = () =>{
    const dispatch = useDispatch();
    const fetchMovies = async() =>{
        try{
            const response =await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', API_OPTIONS)
            // console.log("top")
            const jsonData =  await response.json();
            dispatch(addTopRated(jsonData.results));
        } catch (error) {
            console.log("Error fetching toprated movies:", error);
        }
    };

    useEffect(() => {
        fetchMovies();
    },[dispatch])
}

export default useTopRated;