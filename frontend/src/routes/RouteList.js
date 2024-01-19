import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";

/**
 * RouteList Component:
 *
 * Defines all routes for app
 * "/": Displays homepage and user welcome message
 * - "/*": A catch-all route that redirects any paths with no matches
 *
 */

const RouteList = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default RouteList;
