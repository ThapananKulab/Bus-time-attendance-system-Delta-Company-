import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import axios from "axios";

const drawerWidth = 240;

const StyledDiv = styled.div`
  font-family: "Kanit", sans-serif;
`;

const Sidebar = ({ currentPath }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "กรุณาเข้าสู่ระบบ",
        text: "โปรดเข้าสู่ระบบเพื่อเข้าถึงหน้านี้",
        confirmButtonText: "ตกลง",
      }).then(() => {
        navigate("/");
      });
    }
  }, [navigate]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    navigate("/account");
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/");
        return;
      }

      const response = await fetch(
        "https://api-work-io-demo.vercel.app/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({}),
        }
      );

      if (response.ok) {
        localStorage.removeItem("token");
        navigate("/");
      } else {
        console.error("Failed to logout:", response.statusText);
      }
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get("https://api-work-io-demo.vercel.app/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUserData(response.data);
          setLoading(false);
          if (response.data.role === "admin") {
            setMenuItems([
              { text: "หน้าหลัก", icon: <HomeIcon />, path: "/Home" },
              {
                text: "ข้อมูลพนักงาน",
                icon: <AccountCircle />,
                path: "/view/user",
              },
              {
                text: "แจ้งเตือน",
                icon: <LocalPostOfficeIcon />,
                path: "/view/post",
              },
              { text: "Contact", icon: <ContactMailIcon />, path: "/contact" },
            ]);
          } else {
            setMenuItems([
              { text: "หน้าหลัก", icon: <HomeIcon />, path: "/Home" },
              {
                text: "ข้อมูลส่วนตัว",
                icon: <AccountCircle />,
                path: "/account",
              },
              {
                text: "แจ้งเรื่อง",
                icon: <ContactMailIcon />,
                path: "/view/post",
              },
            ]);
          }
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => navigate(item.path)}
            selected={
              currentPath === item.path || location.pathname === item.path
            }
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={<StyledDiv>{item.text}</StyledDiv>} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div style={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            <StyledDiv>ระบบจัดการลงเวลารถบัส</StyledDiv>
          </Typography>
          <div style={{ marginLeft: "auto" }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <StyledDiv>Account</StyledDiv>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <StyledDiv>Logout</StyledDiv>
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <main
        style={{
          flexGrow: 1,
          padding: "24px",
          marginLeft: isMobile ? 0 : drawerWidth,
        }}
      >
        <Toolbar />
      </main>
    </div>
  );
};

export default Sidebar;
