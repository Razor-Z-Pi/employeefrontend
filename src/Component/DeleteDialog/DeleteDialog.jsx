import React, {useContext} from 'react';
import PropTypes from "prop-types";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import Button from "@mui/material/Button";
import {ItemContext} from "../Context/ContextAppProvider";

const DeleteDialog = (p) => {
  const hide = () => {
    p.setDeleteEmployeeShow(false)
  }

  const context = useContext(ItemContext);

  return (
    <Dialog onClose={hide} fullWidth={true} maxWidth="sm" open={p.open}>
      <DialogTitle>Ты уверен что хочешь удалить???</DialogTitle>
      <DialogContent>
        {p.props.fname + " " + p.props.lname + " " + p.props.position}
      </DialogContent>

      <DialogActions>
        <Button onClick={() => {hide()}}>Отменить</Button>
        <Button onClick={() => {context.delete({id: p.props.id, fname: p.props.fname, lname: p.props.lname, position: p.props.position});
        hide();}}>Удалить</Button>
      </DialogActions>
    </Dialog>
  );
}

DeleteDialog.propType = {
  open: PropTypes.bool.isRequired,
  setDeleteEmployeeShow: PropTypes.func.isRequired,
  props: PropTypes.object,
};
export default DeleteDialog;