import React from "react";
import Sidebar from "./navbar.jsx";
import { Toolbar, Grid } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <Grid container>
      <Sidebar />
      <Grid item xs={12} md={9}>
        <main style={{ flexGrow: 1, padding: "24px" }}>
          <Toolbar />
          {children}
        </main>
      </Grid>
    </Grid>
  );
};

export default Layout;
