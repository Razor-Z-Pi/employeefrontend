import React, {useContext} from 'react';
import PropTypes from "prop-types";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import Button from "@mui/material/Button";
import {ProjectContextEmployee} from "../Context/ContextAppProjectProvider";

const DeleteDialogProject = (p) => {
  const hide = () => {
    p.setDeleteProjectShow(false)
  }

  const context = useContext(ProjectContextEmployee);

  return (
    <Dialog onClose={hide} fullWidth={true} maxWidth="sm" open={p.open}>
      <DialogTitle>Ты уверен что хочешь удалить проект???</DialogTitle>
      <DialogContent>
        {p.props.Name}
      </DialogContent>

      <DialogActions>
        <Button onClick={() => {hide()}}>Отменить</Button>
        <Button onClick={() => {context.delete({
            id: p.props.id,
            Name: p.props.Name,
            Monday: p.props.Monday,
            Tuesday: p.props.Tuesday,
            Wednesday: p.props.Wednesday,
            Thursday: p.props.Thursday,
            Friday: p.props.Friday,
            Sunday: p.props.Sunday,
            Saturday: p.props.Saturday,
            Description: p.props.Description
          });
          hide();}}>Удалить</Button>
      </DialogActions>
    </Dialog>
  );
}

DeleteDialogProject.propType = {
  open: PropTypes.bool.isRequired,
  setDeleteProjectShow: PropTypes.func.isRequired,
  props: PropTypes.object,
};
export default DeleteDialogProject;