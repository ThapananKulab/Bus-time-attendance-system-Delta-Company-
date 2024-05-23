import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { purple } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const primary = purple[500];

export default function Error() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#35baf6",
      }}
    >
      <Typography variant="h1" style={{ color: "white" }}>
        404
      </Typography>
      <Typography variant="h6" style={{ color: "white" }}>
        ไม่เจอหน้า Page นี้
      </Typography>
      <br />
      <Button variant="contained" onClick={handleClick}>
        กลับสู่หน้าหลัก
      </Button>
    </Box>
  );
}
