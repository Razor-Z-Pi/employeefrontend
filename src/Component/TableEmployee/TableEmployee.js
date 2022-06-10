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
import {InputLabel, Paper, Select} from "@mui/material";
import {styled} from '@mui/material/styles';
import {tableCellClasses} from '@mui/material/TableCell';
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import {SpeedDial, SpeedDialAction, SpeedDialIcon} from "@mui/lab";
import PrintIcon from '@mui/icons-material/Print';
import {connect} from "react-redux";
import context from "react-redux/lib/components/Context";
import DialogLogin from "../DialogLogin/DialogLogin";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

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

  // Хука для показывания полей редактирования
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
  const [rowsPerPage, setRowsPerPage] = useState(7);

  const [serchValue, setSerchValue] = useState("");

  const [loginShow, setLoginShow] = useState(false);

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

  const reDisable = () => {
    if (validFname && validLname) {
      setBtnAdd(false);
    }
  }

  const btnAddProtected = (event) => {
    event.preventDefault();
    if (addEmployeefname == "") {
      alert("Строка имение не должна бить пустая!!!");
      setLoginShow(false);
    }
    if (addEmployeelname == "") {
      alert("Строка фамилии не должна бить пустая!!!");
      setLoginShow(false);
    }
    if (addEmployeePosition == "") {
      alert("Строка должности не должна бить пустая!!!");
      setLoginShow(false);
    }
    if (addEmployeePosition != "" && addEmployeelname != "" && addEmployeefname != "") {
      context.create(event, {fname: addEmployeefname, lname: addEmployeelname, position: addEmployeePosition});
      setLoginShow(true);
      setAddEmployeeFname("");
      setAddEmployeeLname("");
      setAddEmployeePosition("");
    }
  }

  const actions = [
    {
      icon: <PrintIcon values="Print" onClick={window.print}/>, name: 'PDF'
    },
  ];

  const SelectedPosition = (event: SelectChangeEvent) => {
    setAddEmployeePosition(event.target.value);
  }

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
                    <TextField fullWidth={true} id="AddFname" value={addEmployeefname} onChange={(event) => {
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
                    <FormControl fullWidth={true} variant="standard" sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel id="demo-simple-select-standard-label">Должность</InputLabel>
                      <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={addEmployeePosition}
                          label="Должность"
                          onChange={SelectedPosition}
                      >
                        <MenuItem value={"Системный администратор"}>Системный администратор</MenuItem>
                        <MenuItem value={"Дизайнер"}>Дизайнер</MenuItem>
                        <MenuItem value={"Менеджер"}>Менеджер</MenuItem>
                        <MenuItem value={"Продукт-Менеджер"}>Продукт-Менеджер</MenuItem>
                        <MenuItem value={"Программист"}>Программист</MenuItem>
                      </Select>
                    </FormControl>
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
              rowsPerPageOptions={[7, 10, 25, {label: "All", value: -1}]}
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

      {deleteEmployeeShow && (
        <DeleteDialog props={deleteEmployee}
                      open={deleteEmployeeShow}
                      setDeleteEmployeeShow={setDeleteEmployeeShow}/>
      )}

      {
        loginShow && (<DialogLogin open={loginShow} setLoginShow={setLoginShow}/>)
      }

    </React.Fragment>
  );
}


export default TableEmployee;