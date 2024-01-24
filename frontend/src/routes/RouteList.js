import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import { useUserContext } from "../context/UserContext";
import CompaniesPage from "../pages/CompaniesPage";
import CompanyProfile from "../pages/CompanyProfile";
import JobsPage from "../pages/JobsPage";
import UserProfile from "../pages/UserProfile";

/**
 * RouteList Component:
 *
 * Defines all routes for app
 * "/": Displays homepage and user welcome message
 * "/signin": Displays form for existing users to sign in
 * "/signup": Displays form for new users to sign up
 * - "/*": A catch-all route that redirects any paths with no matches
 *
 */

// RouteList Component
const RouteList = () => {
  const { user } = useUserContext();
  return (
    <Routes>
      {user ? (
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="/companies" element={<CompaniesPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/companies/:handle" element={<CompanyProfile />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/*" element={<Navigate to="/signin" />} />
        </>
      )}
    </Routes>
  );
};

export default RouteList;
