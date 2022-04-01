import React, {useContext, useState} from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon, makeStyles, Menu, MenuItem, InputBase, alpha
} from "@material-ui/core";
import {IconButton, Typography} from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MenuIcon from "@mui/icons-material/Menu";
import ArticleIcon from '@mui/icons-material/Article';
import {Link, Redirect} from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import {styled} from '@mui/material/styles';
import {AccountCircle} from "@material-ui/icons";
import DateRangeIcon from '@mui/icons-material/DateRange';
import isWeekend from 'date-fns/isWeekend';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {StaticDatePicker} from "@mui/lab";
import AnalyticsIcon from '@mui/icons-material/Analytics';

const AnalysNav = () => {

  const useStyles = makeStyles(theme => ({
    menuIcon: {
      marginRight: theme.spacing(2),
    },
    list: {
      width: "200px"
    },
    link: {
      textDecoration: "none",
      color: theme.palette.text.primary
    }
  }));


  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [auth, setAuth] = useState(true);
  const [date, setDate] = useState(true);
  const [dateForm, setDateForm] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [logout, setLogout] = useState(false);

  const [value, setValue] = React.useState(new Date());

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const Flogout = () => {
    setLogout(true);
  }

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleDate = (event) => {
    setDateForm(event.currentTarget);
  }

  const handleCloseDate = () => {
    setDateForm(null);
  }

  const drawerItems = [
    {
      text: "Сотрудники",
      icon: <AccountBoxIcon/>,
      link: "/HomeList"
    },
    {
      text: "Проекты",
      icon: <ArticleIcon/>,
      link: "/ProjectStatus"
    },
    {
      text: "Аналитика",
      icon: <AnalyticsIcon/>,
      link: "/Analysis"
    }
  ];

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classes.menuIcon}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{mr: 2}}
            onClick={toggleDrawer}
          >
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{display: {xs: 'none', sm: 'block'}}}>
            <b>Аналитика</b>
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
        <Drawer anchor="left" variant="temporary" onClose={toggleDrawer} open={drawerOpen}>
          <List className={classes.list}>
            {drawerItems.map(props => (
              <Link className={classes.link} to={props.link} key={props.text}>
                <ListItem onClick={toggleDrawer} button key={props.text}>
                  <ListItemIcon>{props.icon}</ListItemIcon>
                  <ListItemText>{props.text}</ListItemText>
                </ListItem>
              </Link>
            ))}
          </List>
        </Drawer>
      </AppBar>
      {
        (logout && <Redirect to="./LoginRedirect"/>)
      }
    </Box>
  );
}

export default AnalysNav;