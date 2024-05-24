import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import Account from "./components/Account.jsx";
import Signin from "./components/Signin.jsx";
import Register from "./components/Register.jsx";
import User from "./components/admin-page/User.jsx";
import Layout from "./components/admin-page/Layout.jsx";
import Post from "./components/admin-page/Post.jsx";
import Error from "./Error.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route
        path="/home"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/view/user"
        element={
          <Layout>
            <User />
          </Layout>
        }
      />
      <Route
        path="/view/post"
        element={
          <Layout>
            <Post />
          </Layout>
        }
      />

      <Route path="/register" element={<Register />} />
      <Route
        path="/account"
        element={
          <Layout>
            <Account />
          </Layout>
        }
      />
      <Route path="*" exact={true} element={<Error />} />
    </Routes>
  );
};

export default App;
