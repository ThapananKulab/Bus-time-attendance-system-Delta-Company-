import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Components/Home.jsx";
import Signin from "../Components/Sigin.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/Home" element={<Home />} />
    </Routes>
  );
};

export default App;
