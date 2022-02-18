import React, {useContext} from 'react';
import {Snackbar, SnackbarContent} from "@material-ui/core";
import {ItemContext} from "../Context/ContextAppProvider";
import Button from "@mui/material/Button";

function checkLevel(level) {
  switch (level) {
    case "success":
      return "green";
    case "error":
      return "red";
    default:
      return "white";
  }
}

function AppSnackbar() {
  const context = useContext(ItemContext);
  return (
    <Snackbar autoHideDuration={6000} open={context.message.text !== undefined}>
      {context.message.text && (
        <SnackbarContent style={{backgroundColor: checkLevel(context.message.level)}} message={context.message.text.map((text, index) => (
          <React.Fragment key={index + " " + text}>
            <span>{text + " "}</span>
          </React.Fragment>
        ))} action={[
          <Button
            onClick={() => {
              context.setMessage({})
            }}
            key="dismiss"
            color="inherit">Закрыть</Button>,
        ]}/>
      )}
    </Snackbar>
  );
}

export default AppSnackbar;
