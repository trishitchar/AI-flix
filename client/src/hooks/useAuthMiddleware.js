// /*

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// const getCookie = (name) => {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
// };

export const useAuthMiddleware = () => {
  const navigate = useNavigate();

  // useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);

    // if (token) {
    //   navigate('/browse', { replace: true });
    // } else {
    //     navigate('/', { replace: true });
    //   }

    // if (window.location.pathname === '/' && token) {
    //   navigate('/browse');
    // }
    //  else if (!token && window.location.pathname !== '/') {
    //   navigate('/');
    // }
  // }, []);

  return {};
};

// useEffect(()=>{
//   useAuthMiddleware();
// },[])


// */

/*
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const useAuthMiddleware = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const isLoggedIn = !!token;

    // Define paths for clarity
    const loginPath = '/';
    const browsePath = '/browse';

    if (isLoggedIn) {
      // Redirect to browse if logged in and on the login page
      if (location.pathname === loginPath) {
        navigate(browsePath, { replace: true });
      }
    } else {
      // Redirect to login if not logged in and on any page other than login
      if (location.pathname !== loginPath) {
        navigate(loginPath, { replace: true });
      }
    }
  }, [location.pathname, navigate]);

  return {};
};

*/