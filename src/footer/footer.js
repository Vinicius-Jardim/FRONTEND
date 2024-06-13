import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import logo from "../assets/logo.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import CopyrightIcon from "@mui/icons-material/Copyright";

const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "#346c51",
        marginTop: "20px",
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "5px",
              marginBottom: "10px",
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{ height: "9vh", marginRight: "10px" }}
            />
          </Grid>
          <div style={{ borderTop: "1px solid #C6CFAE", width: "100%" }} />

          <Grid style={{ marginTop: "5px", marginBottom: "5px" }}>
            <FacebookIcon style={{ color: "#C6CFAE" }} />
            <InstagramIcon style={{ color: "#C6CFAE" }} />
            <TwitterIcon style={{ color: "#C6CFAE" }} />
            <LinkedInIcon style={{ color: "#C6CFAE" }} />
          </Grid>

          <Grid style={{ marginTop: "5px", marginBottom: "5px" }}>
            <h6 style={{ color: "#C6CFAE" }}>
              <CopyrightIcon
                style={{ fontSize: "x-small", color: "#C6CFAE" }}
              />
              2024 The GreenHouse | All rights reserved to ABVCorporation
            </h6>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
