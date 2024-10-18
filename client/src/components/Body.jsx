import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Browse from './browse/Browse';
import MovieInfo from '../components/movieinfo/MovieInfo';
import Profile from './profile/Profile';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const Body = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PublicRoute element={<Login />} />} />

        <Route path="/browse" element={<PrivateRoute element={<Browse />} />} />
        <Route path="/movieinfo/:id" element={<PrivateRoute element={<MovieInfo />} />} />
        <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
      </Routes>
    </div>
  );
};

export default Body;
