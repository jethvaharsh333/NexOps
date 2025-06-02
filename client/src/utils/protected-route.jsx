import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { loggedIn } = useSelector((state) => state.auth);
  const [checked, setChecked] = useState(false);
  const [showedToast, setShowedToast] = useState(false);

  useEffect(() => {
    setChecked(true);
  }, []);

  const token = localStorage.getItem('accessToken');

  const isAuthenticated = loggedIn || !!token;

  if (!isAuthenticated && checked) {
    if (!showedToast) {
      toast.error('Unauthorized access');
      setShowedToast(true);
    }
    console.log("authticate middlware ",token);
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;