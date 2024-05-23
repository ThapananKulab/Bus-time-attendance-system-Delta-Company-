import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";
import styled1 from "styled-components";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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

export default function SignIn() {
  const navigate = useNavigate();

  const StyledDiv = styled1.div`
  font-family: "Kanit", sans-serif;
`;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const loginData = {
      name: data.get("name"),
      password: data.get("password"),
      role: "user", // ตั้งค่า role ตามที่คุณต้องการ
    };

    try {
      const response = await axios.post(
        "https://api-work-io-demo.vercel.app/login",
        loginData
      );
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      toast.success("ล็อกอิน สำเร็จ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/Home");
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
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <title>เข้าสู่ระบบ</title>
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
            src="https://deltathailand.com/imgadmins/news/news_cover/DELTA_news_photo2019-02-27_15-17-12.jpg"
            sx={{ width: 120, height: 120 }}
          ></Avatar>
          <Typography component="h1" variant="h5">
            <StyledDiv>ระบบบันทึกเวลารถบัส Delta </StyledDiv>
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
