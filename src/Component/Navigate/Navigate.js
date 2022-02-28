import React, {useState} from 'react';
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

const Navigate = () => {

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

  const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));


  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [auth, setAuth] = useState(true);
  const [date, setDate] = useState(true);
  const [dateForm, setDateForm] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [logout, setLogout] = useState(false);
  const [search, setSearch] = useState("");

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
            <b>Планировщик рабочей недели</b>
          </Typography>
          {date && (
            <div>
              <IconButton
                size="large"
                aria-label="date-project"
                aria-controls="menu-date"
                aria-haspopup="true"
                onClick={handleDate}
                color="inherit">
                <DateRangeIcon/>
              </IconButton>
              <Menu id="menu-appbar-date"
                    dateForm={dateForm}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    open={Boolean(dateForm)}
                    onClose={handleCloseDate}
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <StaticDatePicker
                    orientation="landscape"
                    openTo="day"
                    value={value}
                    shouldDisableDate={isWeekend}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Menu>
            </div>
          )
          }
          <Typography sx={{flexGrow: 1}}/>
          <Search>
            <SearchIconWrapper>
              <SearchIcon/>
            </SearchIconWrapper>
            <StyledInputBase
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск…"
              inputProps={{'aria-label': 'search'}}
            />
          </Search>

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

export default Navigate;