import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SignIn from "../pages/SignIn";
import { useUserContext } from "../context/UserContext";

/**
 * RouteList Component:
 *
 * Defines all routes for app
 * "/": Displays homepage and user welcome message
 * - "/*": A catch-all route that redirects any paths with no matches
 *
 */

// RouteList Component
const RouteList = () => {
  const { user } = useUserContext();
  console.log(user);
  return (
    <Routes>
      {user ? (
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/*" element={<Navigate to="/signin" />} />
        </>
      )}
    </Routes>
  );
};

export default RouteList;
