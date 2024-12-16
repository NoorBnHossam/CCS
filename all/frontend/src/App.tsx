import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import GaussianModel from "./pages/GaussianModel";
import { LinearRegression } from "./pages/LinearRegression";
import { NaiveBayes } from "./pages/NaiveBayes";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gaussian" element={<GaussianModel />} />
        <Route path="/regression" element={<LinearRegression />} />
        <Route path="/naive-bayes" element={<NaiveBayes />} />
      </Routes>
    </Router>
  );
}
