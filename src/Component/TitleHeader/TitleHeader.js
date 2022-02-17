import React from "react";
import {AppBar, Box, IconButton, Toolbar, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import Login from "../../Pages/Login";
import MenuIcon from '@mui/icons-material/Menu';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function LoginGhost(props) {
  if (props) {
    props.preventDefault();
    document.getElementById("btnLogin").style.visibility = "hidden";
    document.getElementById("btnLogin").style.display = "none";
  }
}

function TitleHeader() {
  return (
    <Router>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className="Burger"
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
            <Button id="btnLogin" onClick={(props) => {LoginGhost(props)}} color="inherit">
              <Link to="/Login">Login</Link>
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Switch>
        <Route path="/Login">
          <Login />
        </Route>
      </Switch>

    </Router>
  )
}

export default TitleHeader;