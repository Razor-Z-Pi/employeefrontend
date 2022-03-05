import React, {useContext, useEffect, useState} from 'react';
import {ItemContext} from "../Context/ContextAppProvider";
import {
  Fab, FormControlLabel,
  IconButton, Switch,
  Table,
  TableBody,
  TableCell,
  TableHead, TablePagination,
  TableRow,
  TextField
} from "@material-ui/core";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import DeleteDialog from "../DeleteDialog/DeleteDialog";
import {Paper} from "@mui/material";
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import Box from "@mui/material/Box";
import SpeedDial from '@mui/material/SpeedDial';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

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

  //Хука для модального окна удаления
  const [deleteEmployeeShow, setDeleteEmployeeShow] = useState(false);

  //Хука для удаления
  const [deleteEmployee, setDeleteEmployee] = useState(null);

  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [fname, setfname] = useState(""); //значение input
  const [lname, setlname]= useState("");
  const [position, setposition] = useState("");
  const [formValid, setFormValid] = useState(false); // состояние кнопки

  const actions = [
    { icon: <PrintIcon />, name: 'Print' },
    { icon: <ShareIcon />, name: 'Share' },
  ];

  useEffect(() => {
      if (fname || lname || position) {
        setFormValid(false);
      } else {
        setFormValid(true);
      }
    },
    [fname, lname, position]);

  // Убираем или добавляем padding
  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <React.Fragment>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <form onSubmit={(event) => {
          context.create(event, {fname: addEmployeefname, lname: addEmployeelname, position: addEmployeePosition})
        }}>

          <div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TextField
                      fullWidth={true}
                      value={addEmployeefname}
                      onChange={(event) => {
                        setAddEmployeeFname(event.target.value)
                      }}
                      label="Новое имя"
                    name="fnameValid"/>
                  </TableCell>

                  <TableCell align="center">
                    <TextField fullWidth={true}
                               value={addEmployeelname}
                               onChange={(event) => {
                                 setAddEmployeeLname(event.target.value)
                               }}
                               label="Новая фамилия"
                               name="lnameValid"/>
                  </TableCell>

                  <TableCell>
                    <TextField fullWidth={true}
                               value={addEmployeePosition}
                               onChange={(event) => {
                                 setAddEmployeePosition(event.target.value)
                               }}
                               label="Новая должность"
                               name="positionValid"/>
                  </TableCell>

                  <TableCell align="right">
                    <IconButton disabled={!formValid} type="submit">
                      <Fab color="primary" aria-label="add">
                        <AddIcon/>
                      </Fab>
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </div>

          <Table padding={dense ? "none" : "normal"}>
            <TableHead>
              <TableRow>
                <StyledTableCell>Имя</StyledTableCell>
                <StyledTableCell align="center">Фамилия</StyledTableCell>
                <StyledTableCell>Должность</StyledTableCell>
                <StyledTableCell align="right">Действия</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>

              </TableRow>

              {context.employee.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).reverse().map((props, index) => (

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

                    <IconButton onClick={() => {
                      setDeleteEmployeeShow(true);
                      setDeleteEmployee(props)
                    }}>
                      <DeleteIcon/>
                    </IconButton>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={context.employee.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Table>
        </form>
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense}/>}
        label="Сжать таблицу"
      />

      <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
        <SpeedDial
          ariaLabel="SpeedDial basic example"
            sx={{ position: 'absolute', bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
            />
          ))}
        </SpeedDial>
      </Box>

      {deleteEmployeeShow && (
        <DeleteDialog props={deleteEmployee}
                      open={deleteEmployeeShow}
                      setDeleteEmployeeShow={setDeleteEmployeeShow}/>
      )}
    </React.Fragment>
  );
}

export default TableEmployee;