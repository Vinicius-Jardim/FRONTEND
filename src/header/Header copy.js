// src/components/Header.js
import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import "./Header.css";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <img src={logo} alt="Logo" className="logo" />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          The GreenHouse
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit">Home </Button>
          <Button color="inherit"> About us</Button>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
