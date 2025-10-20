import { useState } from 'react';
import { REACT_APP_GEMI_NI } from '../utils/constants';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { HarmBlockThreshold, HarmCategory} from "@google/generative-ai";
import useTmdbMovieSearch from './useTmdbMovieSearch';
// import { useSelector } from 'react-redux';

const useGeminiResult = () => {
  const [error, setError] = useState(null);
  const [recommendations, setRecommendations] = useState('');
  // const movieResult = useSelector((store) => store?.gpt?.movieResult)
  // console.log(movieResult[0])

  const searchMovies = async (query) => {
    setError(null);
    setRecommendations('');

    try {
      const genAI = new GoogleGenerativeAI(REACT_APP_GEMI_NI);
      
      const safetySetting = [
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
      ];
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" , safetySetting});

      const prompt = `Act as a movie recommendation system and suggest some movies for the query "${query}". Only give me names of 5 movies, comma-separated like the example result given ahead. Example Result: Hera Pheri, 3 Idiots, Hulk, Dunki, Red`;

      const result = await model.generateContent([prompt]);
      
      if (result && result.response && result.response.text) {
        setRecommendations(result.response.text());
      } else {
        setRecommendations('No recommendations found.');
      }
    } catch (err) {
      setError('Failed to fetch recommendations. Please try again.');
    }
  };
  useTmdbMovieSearch(recommendations);
  return { error, recommendations, searchMovies };
};

export default useGeminiResult;