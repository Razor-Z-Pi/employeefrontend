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
  ListItemIcon, makeStyles
} from "@material-ui/core";
import {IconButton, Typography} from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MenuIcon from "@mui/icons-material/Menu";
import ArticleIcon from '@mui/icons-material/Article';
import {Link} from "react-router-dom";

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

const Navigate = () => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);

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