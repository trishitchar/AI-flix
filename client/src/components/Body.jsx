import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Browse from './Browse';
import MovieInfo from './MovieInfo';
import Profile from './Profile';
import  {useAuthMiddleware}  from '../hooks/useAuthMiddleware';

const Body = () => {
  useAuthMiddleware();

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/movieinfo/:id" element={<MovieInfo />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default Body;