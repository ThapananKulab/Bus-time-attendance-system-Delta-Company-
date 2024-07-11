import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";
import styled1 from "styled-components";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5", // Primary color
    },
    secondary: {
      main: "#f50057", // Secondary color
    },
  },
});

function SignIn() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const StyledDiv = styled1.div`
    font-family: "Kanit", sans-serif;
  `;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const loginData = {
      name: data.get("name"),
      password: data.get("password"),
    };

    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://api-work-io-demo.vercel.app/login",
        loginData
      );
      const token = response.data.token;
      localStorage.setItem("token", token);

      toast.success("ล็อกอิน สำเร็จ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Decode the token to get the user's role
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role;

      if (userRole === "admin") {
        navigate("/home");
      } else {
        navigate("/account");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("ชื่อ Username หรือ รหัสผ่านไม่ถูกต้อง", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <title>ระบบลงเวลารถบัส Delta | เข้าสู่ระบบ</title>
      </Helmet>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            src="https://cdn-icons-png.flaticon.com/512/3589/3589030.png"
            sx={{ width: 120, height: 120 }}
          />
          <Typography component="h1" variant="h5">
            <StyledDiv>ระบบบันทึกเวลารถบัส</StyledDiv>
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="ชื่อบัญชีผู้ใช้"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="รหัสผ่าน"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              <StyledDiv>เข้าสู่ระบบ</StyledDiv>
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/register" variant="body2">
                  {"สมัครสมาชิก"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <ToastContainer />
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;
