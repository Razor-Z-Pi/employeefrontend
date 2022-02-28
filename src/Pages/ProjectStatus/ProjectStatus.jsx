import React from 'react';
import {
  Fab,
  IconButton,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TextField
} from "@material-ui/core";
import Navigate from "../../Component/Navigate/Navigate";
import FormDay from "../../Component/FormDay/FormDay";
import AddIcon from "@mui/icons-material/Add";
import InputLabel from "@mui/material/InputLabel";

const ProjectStatus = () => {
  return (
    <React.Fragment>
      <Navigate/>
      <form>
        <div>
          <TableHead>
            <TableRow sx={{ flexGrow: 1, display: 'flex', flexWrap: "wrap"}}>
              <TableCell>
                <TextField fullWidth={true} label="Название проекта"/>
              </TableCell>

              <TableCell>
                <FormDay/>
              </TableCell>

              <TableCell>
                <FormDay />
              </TableCell>

              <TableCell>
                <FormDay />
              </TableCell>

              <TableCell>
                <FormDay />
              </TableCell>

              <TableCell>
                <FormDay />
              </TableCell>

              <TableCell>
                <FormDay />
              </TableCell>

              <TableCell>
                <FormDay />
              </TableCell>

              <TableCell align="right">
                <IconButton type="submit">
                  <Fab color="primary" aria-label="add">
                    <AddIcon/>
                  </Fab>
                </IconButton>
              </TableCell>

            </TableRow>
          </TableHead>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Проект</TableCell>
              <TableCell>Понедельник</TableCell>
              <TableCell>Вторник</TableCell>
              <TableCell>Среда</TableCell>
              <TableCell>Четверг</TableCell>
              <TableCell>Пятница</TableCell>
              <TableCell>Суббота</TableCell>
              <TableCell>Воскресенье</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </form>
    </React.Fragment>
  )
}

export default ProjectStatus;