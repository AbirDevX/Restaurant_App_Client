import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, ...rest }) {
  const { isAuthenticated, accessToken, user } = useSelector(
    (state) => state.authSlice
  );
  return (
    <>
      {isAuthenticated && accessToken && user ? (
        children
      ) : (
        <Navigate to="/login" replace={true} />
      )}
    </>
  );
}

export default ProtectedRoute;
