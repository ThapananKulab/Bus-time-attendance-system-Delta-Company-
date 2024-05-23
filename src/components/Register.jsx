import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled1 from "styled-components";

const theme = createTheme();

export default function Register() {
  const StyledDiv = styled1.div`
  font-family: "Kanit", sans-serif;
`;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://api-work-io-demo.vercel.app/register",
        {
          ...formData,
          role: "พนักงาน",
        }
      );
      console.log(response.data);
      toast.success("เพิ่ม username สำเร็จ !");
    } catch (error) {
      console.error("There was an error registering the user!", error);
      toast.error("เกิดข้อผิดพลาด");
    }
  };

  return (
    <ThemeProvider theme={theme}>
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
          />

          <Typography component="h1" variant="h5">
            <StyledDiv>ลงทะเบียน</StyledDiv>
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
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              <StyledDiv>ยืนยัน</StyledDiv>
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/" variant="body2">
                  {"เข้าสู่ระบบ"}
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
