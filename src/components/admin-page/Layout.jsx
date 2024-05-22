import React from "react";
import Sidebar from "./navbar.jsx";
import { Toolbar } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ flexGrow: 1, padding: "24px" }}>
        <Toolbar />
        {children}
      </main>
    </div>
  );
};

export default Layout;
