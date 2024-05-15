import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import Signin from "./components/Signin.jsx";
import Register from "./components/Register.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
