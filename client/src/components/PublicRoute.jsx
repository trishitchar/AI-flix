import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ element }) => {
  const { token } = useSelector((state) => state.user);

  return token ? <Navigate to="/browse" replace /> : element;
};

export default PublicRoute;
