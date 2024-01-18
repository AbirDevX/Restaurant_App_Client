import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function GustRoute({ children, ...rest }) {
  const { isAuthenticated, accessToken, user } = useSelector(
    (state) => state.authSlice
  );

  return (
    <>
      {isAuthenticated && accessToken && user ? (
        <Navigate to="/" replace={true} />
      ) : (
        children
      )}
    </>
  );
}

export default GustRoute;
