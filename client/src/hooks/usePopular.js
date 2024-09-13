import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addNowPopular } from "../redux/moviesSlice";
import { useEffect } from "react";

const usePopular = () => {
  const dispatch = useDispatch();

  const fetchMovies = async () => {
    try {
      const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', API_OPTIONS);
    //   console.log("popular"+response)
      const jsonData = await response.json();
      dispatch(addNowPopular(jsonData.results));
    } catch (error) {
      console.log("Error fetching popular movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [dispatch]);
};

export default usePopular;
