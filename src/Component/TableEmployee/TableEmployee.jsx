import React, {useContext, useState} from 'react';
import {ItemContext} from "../Context/ContextAppProvider";
import {
  Fab,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField
} from "@material-ui/core";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';

const TableEmployee = () => {
  const context = useContext(ItemContext);
  // Хуки который будет содержать данные для добавления сотурдника
  const [addEmployeefname, setAddEmployeeFname] = useState("");
  const [addEmployeelname, setAddEmployeeLname] = useState("");
  const [addEmployeePosition, setAddEmployeePosition] = useState("");

  // Хука дял показывания полей редактирования
  const [editEmployeeShow, setEditEmployeeShow] = useState(false);
  // Хуки для редоктирования
  const [editEmployeeFname, setEditEmployeeFname] = useState("");
  const [editEmployeeLname, setEditEmployeeLname] = useState("");
  const [editEmployeePosition, setEditEmployeePosition] = useState("");

  return (
    <form onSubmit={(event) => {
      context.create(event, {fname: addEmployeefname, lname: addEmployeelname, position: addEmployeePosition})
    }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Имя</TableCell>
            <TableCell align="center">Фамилия</TableCell>
            <TableCell>Должность</TableCell>
            <TableCell align="right">Действия</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell>
              <TextField fullWidth={true} value={addEmployeefname} onChange={(event) => {
                setAddEmployeeFname(event.target.value)
              }} label="Новое имя"/>
            </TableCell>

            <TableCell align="center">
              <TextField fullWidth={true} value={addEmployeelname} onChange={(event) => {
                setAddEmployeeLname(event.target.value)
              }} label="Новая фамилия"/>
            </TableCell>

            <TableCell>
              <TextField fullWidth={true} value={addEmployeePosition} onChange={(event) => {
                setAddEmployeePosition(event.target.value)
              }} label="Новая должность"/>
            </TableCell>

            <TableCell align="right">
              <IconButton type="submit">
                <Fab color="primary" aria-label="add">
                  <AddIcon/>
                </Fab>
              </IconButton>
            </TableCell>
          </TableRow>

          {context.employee.slice().reverse().map((props, index) => (
            <TableRow key={"todo " + index}>
              <TableCell>

                {editEmployeeShow === props.id ?
                  <TextField fullWidth={true}
                             value={editEmployeeFname}
                             onChange={(event) => {
                               setEditEmployeeFname(event.target.value)
                             }}/>
                  :
                  props.fname
                }

              </TableCell>

              <TableCell align="center">

                {editEmployeeShow === props.id ?
                  <TextField fullWidth={true}
                             value={editEmployeeLname}
                             onChange={(event) => {
                               setEditEmployeeLname(event.target.value)
                             }}/>
                  :
                  props.lname
                }

              </TableCell>

              <TableCell>

                {editEmployeeShow === props.id ?
                  <TextField fullWidth={true}
                             value={editEmployeePosition}
                             onChange={(event) => {
                               setEditEmployeePosition(event.target.value)
                             }}
                             InputProps={{
                               endAdornment: <React.Fragment>
                                 <IconButton onClick={() => {
                                   setEditEmployeeShow(false)
                                 }}><CancelPresentationIcon/></IconButton>
                                 <IconButton onClick={() => {
                                   context.update({
                                     id: props.id,
                                     fname: editEmployeeFname,
                                     lname: editEmployeeLname,
                                     position: editEmployeePosition
                                   });
                                   setEditEmployeeShow(false);
                                 }}><CheckIcon/></IconButton>
                               </React.Fragment>,
                             }}/>
                  :
                  props.position
                }

              </TableCell>

              <TableCell align="right">

                <IconButton onClick={() => {
                  setEditEmployeeShow(props.id);
                  setEditEmployeeFname(props.fname);
                  setEditEmployeeLname(props.lname);
                  setEditEmployeePosition(props.position);
                }}>
                  <EditIcon/>
                </IconButton>

                <IconButton>
                  <DeleteIcon/>
                </IconButton>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </form>
  );
}

export default TableEmployee;