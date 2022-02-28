import React, {useState} from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon, makeStyles, Menu, MenuItem, InputBase
} from "@material-ui/core";
import {IconButton, Typography} from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MenuIcon from "@mui/icons-material/Menu";
import ArticleIcon from '@mui/icons-material/Article';
import {Link} from "react-router-dom";
import {AccountCircle, Search} from "@material-ui/icons";
import SearchIcon from '@mui/icons-material/Search';
import {styled} from '@mui/material/styles';
import MoreIcon from '@mui/icons-material/MoreVert';
import * as PropTypes from "prop-types";

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

function SearchIconWrapper(props) {
  return null;
}

SearchIconWrapper.propTypes = {children: PropTypes.node};
const Navigate = () => {

  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const mobileMenuId = 'primary-search-account-menu-mobile';

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

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

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classes.menuIcon}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <b>Планировщик рабочей недели</b>
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
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
    </Box>
  );
}

export default Navigate;