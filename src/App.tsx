import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";

import Home from "./pages/Home";
import Movie from "./pages/Movie";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="movies/:id"
          element={<Movie />}
        />
      </Routes>
    </HashRouter>
  );
}
