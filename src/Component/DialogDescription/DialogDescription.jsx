import React from 'react';
import PropTypes from "prop-types";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import Button from "@mui/material/Button";
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const DialogDescription = (p) => {
  const hide = () => {
    p.setDescriptionShow(false)
  }

  return (
    <Dialog onClose={hide} fullWidth={true} maxWidth="sm" open={p.open}>
      <DialogTitle>О проекте</DialogTitle>
      <DialogContent>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Открыть</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {p.props.Description}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => {hide()}}>Закрыть</Button>
      </DialogActions>
    </Dialog>
  );
}

DialogDescription.propType = {
  open: PropTypes.bool.isRequired,
  setDescriptionShow: PropTypes.func.isRequired,
  props: PropTypes.object,
};
export default DialogDescription;