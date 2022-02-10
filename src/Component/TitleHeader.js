import React from "react";
import {AppBar, Box, createTheme, IconButton, Toolbar, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {ThemeProvider} from "@emotion/react";
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import App from "../App";

function TitleHeader() {
  return (
    <Router>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <b>Планировщик рабочей недели</b>
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </Router>
  )
}

export default TitleHeader;