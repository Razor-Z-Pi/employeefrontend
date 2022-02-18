import React from "react";
import {Box, Button, Typography} from "@material-ui/core";
import {NavLink} from "react-router-dom";

const NotFound = () => {
  return (
    <Box>
      <Typography variant="h1">Страница не найдена:(</Typography>
      <NavLink style={{textDecoration: "none"}} to="/">
        <Button
          color="primary"
          variant="contained"
          size="large">
          Перейти на главную страницу!!!
        </Button>
      </NavLink>
    </Box>
  );
};

export default NotFound;