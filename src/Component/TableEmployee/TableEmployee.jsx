import React, {useContext, useState} from 'react';
import {ItemContext} from "../Context/ContextAppProvider";
import {
  alpha,
  Fab, FormControlLabel,
  IconButton, InputBase, Switch,
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
import {styled} from '@mui/material/styles';
import {tableCellClasses} from '@mui/material/TableCell';
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import {SpeedDial, SpeedDialAction, SpeedDialIcon} from "@mui/lab";
import PrintIcon from '@mui/icons-material/Print';

const StyledTableCell = styled(TableCell)(({theme}) => ({
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

  const [serchValue, setSerchValue] = useState("");

  const filterEmployee = context.employee.filter(item => {
    return item.fname.toLowerCase().includes(serchValue.toLowerCase());
  });

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

  const [validFname, setValidFname] = useState(false);
  const [validLname, setValidLname] = useState(false);
  const [validPosition, setValidPosition] = useState(false);
  const [btnAdd, setBtnAdd] = useState(true);

  const validateButtonFname = (event) => {
    event.preventDefault();
    if (!/^\s*$/.test(event.target.value)) {
      setValidFname(true);
    } else {
      setValidFname(false);
      setBtnAdd(true);
    }
  }

  const validateButtonLname = (event) => {
    event.preventDefault();
    if (!/^\s*$/.test(event.target.value)) {
      setValidLname(true);
    } else {
      setValidLname(false);
      setBtnAdd(true);
    }
  }

  const validateButtonPosition = (event) => {
    event.preventDefault();
    if (!/^\s*$/.test(event.target.value)) {
      setValidPosition(true);
    } else {
      setValidPosition(false);
      setBtnAdd(true);
    }
  }

  const reDisable = () => {
    if (validFname && validLname && validPosition) {
      setBtnAdd(false);
    }
  }

  const btnAddProtected = (event) => {
    event.preventDefault();
    if (addEmployeefname == "") {
      alert("Строка имение не должна бить пустая!!!");
    }
    if (addEmployeelname == "") {
      alert("Строка фамилии не должна бить пустая!!!");
    }
    if (addEmployeePosition == "") {
      alert("Строка должности не должна бить пустая!!!");
    }
    if (addEmployeePosition != "" && addEmployeelname != "" && addEmployeefname != "") {
      context.create(event, {fname: addEmployeefname, lname: addEmployeelname, position: addEmployeePosition});
    }
  }

  const actions = [
    {
      icon: <PrintIcon values="Print" onClick={window.print}/>, name: 'PDF'
    },
  ];

  return (
    <React.Fragment>
      <Paper sx={{width: "100%", mb: 2}}>
        <form onSubmit={(event) => {
          btnAddProtected(event);
        }}>

          <div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TextField fullWidth={true} value={addEmployeefname} onChange={(event) => {
                      if (event.target.value.length < 25) {
                        setAddEmployeeFname(event.target.value);
                        validateButtonFname(event);
                        reDisable();
                      } else {
                        alert("Не больше 25 символов");
                      }
                    }} label="Имя"/>
                  </TableCell>

                  <TableCell align="center">
                    <TextField fullWidth={true} value={addEmployeelname} onChange={(event) => {
                      if (event.target.value.length < 25) {
                        setAddEmployeeLname(event.target.value);
                        validateButtonLname(event);
                        reDisable();
                      } else {
                        alert("Не больше 25 символов");
                      }
                    }} label="Фамилия"/>
                  </TableCell>

                  <TableCell>
                    <TextField fullWidth={true} value={addEmployeePosition} onChange={(event) => {
                      if (event.target.value.length < 25) {
                        setAddEmployeePosition(event.target.value);
                        validateButtonPosition(event);
                        reDisable();
                      } else {
                        alert("Не больше 25 символов");
                      }
                    }} label="Должность"/>
                  </TableCell>

                  <TableCell>
                    <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                      <SearchIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                      <TextField onChange={(event) => {
                        setSerchValue(event.target.value);
                      }}
                                 id="input-with-sx"
                                 label="Поиск..."
                                 variant="standard"/>
                    </Box>
                  </TableCell>

                  <TableCell align="right">
                    <IconButton disabled={btnAdd} type="submit">
                      {!btnAdd ?
                        <Fab color="primary" aria-label="add">
                          <AddIcon/>
                        </Fab>
                        :
                        <Fab color="greey" aria-label="add">
                          <AddIcon/>
                        </Fab>
                      }
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </div>

          <Table padding={dense ? "none" : "normal"} id="print-content">
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

              {filterEmployee.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).reverse().map((props, index) => (

                <TableRow key={"todo " + index}>

                  <TableCell style={{width: 120}}>
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
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
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

      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>

      {deleteEmployeeShow && (
        <DeleteDialog props={deleteEmployee}
                      open={deleteEmployeeShow}
                      setDeleteEmployeeShow={setDeleteEmployeeShow}/>
      )}

    </React.Fragment>
  );
}

export default TableEmployee;