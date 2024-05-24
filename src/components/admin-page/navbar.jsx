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
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useLocation, useNavigate } from "react-router-dom";
import styled1 from "styled-components";

const drawerWidth = 240;

const Sidebar = ({ currentPath }) => {
  const StyledDiv = styled1.div`
  font-family: "Kanit", sans-serif;
`;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();
  const navigate = useNavigate();

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
        navigate("/"); // Use the navigate function from the hook
      } else {
        console.error("Failed to logout:", response.statusText);
      }
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const isBelowThreshold = window.innerWidth < theme.breakpoints.values.sm;
      setMobileOpen(isBelowThreshold);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [theme.breakpoints.values.sm]);

  const menuItems = [
    { text: "หน้าหลัก", icon: <HomeIcon />, path: "/Home" },
    { text: "ข้อมูลพนักงาน", icon: <AccountCircle />, path: "/view/user" },
    { text: "แจ้งเตือน", icon: <LocalPostOfficeIcon />, path: "/view/post" },
    { text: "Contact", icon: <ContactMailIcon />, path: "/contact" },
  ];

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <StyledDiv>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component="a"
              href={item.path}
              selected={
                currentPath === item.path || location.pathname === item.path
              }
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <StyledDiv>
                <ListItemText primary={item.text} />
              </StyledDiv>
            </ListItem>
          ))}
        </StyledDiv>
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
            <StyledDiv>ระบบจัดการลงเวลารถบัส Delta </StyledDiv>
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
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <StyledDiv>Account </StyledDiv>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <StyledDiv>Logout </StyledDiv>
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
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            marginTop: isMobile ? "64px" : "0px",
            display: { xs: "block", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              ...(isMobile && {
                width: "80%",
              }),
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
