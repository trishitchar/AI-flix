import { useState } from 'react';
import {REACT_APP_GEMINI} from '../utils/constants'
import { GoogleGenerativeAI } from "@google/generative-ai";

const useGeminiResult = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recommendations, setRecommendations] = useState('');

  const searchMovies = async (query) => {
    setLoading(true);
    setError(null);

    try {
      const genAI = new GoogleGenerativeAI(REACT_APP_GEMINI);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Act as a movie recommendation system and suggest some movies for the query "${query}". Only give me names of 5 movies, comma-separated like the example result given ahead. Example Result: Hera Pheri, 3 Idiots, Hulk, Dunki, Red`;

      const result = await model.generateContent([prompt]);
      
      if (result && result.response && result.response.text) {
        setRecommendations(result.response.text());
      } else {
        setRecommendations('No recommendations found.');
      }
    } catch (err) {
      setError('Failed to fetch recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, recommendations, searchMovies };
};

export default useGeminiResult;
