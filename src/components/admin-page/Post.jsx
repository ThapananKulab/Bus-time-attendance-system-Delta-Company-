import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

export default function App() {
  return (
    <div>
      <Grid container spacing={3} sx={{ padding: 3 }}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h5">Title</Typography>
            <Typography variant="body1">Content</Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
