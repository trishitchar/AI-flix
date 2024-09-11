import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

export const useAuthMiddleware = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);

    // if (window.location.pathname === '/' && token) {
    //   navigate('/browse');
    // }
    //  else if (!token && window.location.pathname !== '/') {
    //   navigate('/');
    // }
  }, [navigate]);

  return {};
};