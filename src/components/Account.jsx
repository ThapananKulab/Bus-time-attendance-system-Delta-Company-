import axios from "axios";
import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import styled1 from "styled-components";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const StyledDiv = styled1.div`
  font-family: "Kanit", sans-serif;
`;

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get("http://localhost:3000/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUserData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <Box>
      {loading ? (
        <CircularProgress />
      ) : userData ? (
        <Box
          sx={{
            width: "100%",
            maxWidth: 480,
            bgcolor: "background.paper",
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h5" component="div" gutterBottom>
            <StyledDiv>ข้อมูลบัญชีผู้ใช้</StyledDiv>
          </Typography>
          <Typography variant="body1">
            <StyledDiv>
              <strong>ID:</strong> {userData._id}{" "}
            </StyledDiv>
          </Typography>
          <Typography variant="body1">
            <StyledDiv>
              <strong>ชื่อบัญชีผู้ใช้:</strong> {userData.name}{" "}
            </StyledDiv>
          </Typography>
          <Typography variant="body1">
            <StyledDiv>
              <strong>Email:</strong> {userData.email}{" "}
            </StyledDiv>
          </Typography>
        </Box>
      ) : (
        <Typography variant="body1">
          {" "}
          <StyledDiv>ไม่มีข้อมูลผู้ใช้</StyledDiv>
        </Typography>
      )}
    </Box>
  );
};

export default ProfilePage;
