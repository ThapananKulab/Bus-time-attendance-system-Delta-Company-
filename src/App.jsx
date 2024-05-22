import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import Signin from "./components/Signin.jsx";
import Register from "./components/Register.jsx";
import User from "./components/admin-page/User.jsx";
import Layout from "./components/admin-page/Layout.jsx";
import Post from "./components/admin-page/Post.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/view/user" element={<User />} />
      </Route>
      <Route path="/view/post" element={<Post />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
