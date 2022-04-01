import React, {useState} from "react";
import {
  AppBar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar
} from "@material-ui/core";
import {IconButton, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DateRangeIcon from "@mui/icons-material/DateRange";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {StaticDatePicker} from "@mui/lab";
import isWeekend from "date-fns/isWeekend";
import TextField from "@mui/material/TextField";
import {AccountCircle} from "@material-ui/icons";
import {Link, Redirect} from "react-router-dom";

const EmployeeNav = () => {

  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [logout, setLogout] = useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const Flogout = () => {
    setLogout(true);
  }

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{display: {xs: 'none', sm: 'block'}}}>
            <b>Планировщик рабочей недели</b>
          </Typography>
          <Typography sx={{flexGrow: 1}}/>
          <Typography style={{fontWeight:700}}>{localStorage.getItem("Admin")}</Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle/>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Профиль</MenuItem>
                <MenuItem onClick={Flogout}>Выйти из аккаунта</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      {
        (logout && <Redirect to="./LoginRedirect"/>)
      }
    </Box>
  )
}

export default EmployeeNav;