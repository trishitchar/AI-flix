import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element }) => {
  const { token } = useSelector((state) => state.user);

  return token ? element : <Navigate to="/" replace />;
};

export default PrivateRoute;
