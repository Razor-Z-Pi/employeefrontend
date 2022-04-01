import React, {useContext, useState} from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, Fab, IconButton,
  TableCell,
  TableHead,
  TableRow,
  TextField
} from "@material-ui/core";
import {ProjectContextEmployee} from "../Context/ContextAppProjectProvider";
import {useTheme} from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import {List, Slide, Table, TextareaAutosize} from "@mui/material";
import {TransitionProps} from '@mui/material/transitions';
import {ItemContext} from "../Context/ContextAppProvider";
import Button from "@mui/material/Button";


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogAddProject = (p) => {
  const hide = () => {
    p.setShowAddData(false);
  }

  const contextEmployee = useContext(ItemContext);

  const theme = useTheme();
  const [personName, setPersonName] = useState([]);
  const [personName2, setPersonName2] = useState([]);
  const [personName3, setPersonName3] = useState([]);
  const [personName4, setPersonName4] = useState([]);
  const [personName5, setPersonName5] = useState([]);
  const [personName6, setPersonName6] = useState([]);
  const [personName7, setPersonName7] = useState([]);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const handleChange = (event) => {
    if (event.target.value.length > 0) {
      setAddDay1(event.target.value);
    } else {
      setAddDay1("Выходной");
    }
    const {
      target: {value},
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(', ') : value,
    );
  };

  const handleChange2 = (event) => {
    if (event.target.value.length > 0) {
      setAddDay2(event.target.value);
    } else {
      setAddDay2("Выходной")
    }
    const {
      target: {value},
    } = event;
    setPersonName2(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(', ') : value,
    );
  };

  const handleChange3 = (event) => {
    if (event.target.value.length > 0) {
      setAddDay3(event.target.value);
    } else {
      setAddDay3("Выходной")
    }
    const {
      target: {value},
    } = event;
    setPersonName3(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(', ') : value,
    );
  };

  const handleChange4 = (event) => {
    if (event.target.value.length > 0) {
      setAddDay4(event.target.value);
    } else {
      setAddDay4("Выходной")
    }
    const {
      target: {value},
    } = event;
    setPersonName4(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(', ') : value,
    );
  };

  const handleChange5 = (event) => {
    if (event.target.value.length > 0) {
      setAddDay5(event.target.value);
    } else {
      setAddDay5("Выходной")
    }
    const {
      target: {value},
    } = event;
    setPersonName5(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(', ') : value,
    );
  };

  const handleChange6 = (event) => {
    if (event.target.value.length > 0) {
      setAddDay6(event.target.value);
    } else {
      setAddDay6("Выходной")
    }
    const {
      target: {value},
    } = event;
    setPersonName6(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(', ') : value,
    );
  };

  const handleChange7 = (event) => {
    if (event.target.value.length > 0) {
      setAddDay7(event.target.value);
    } else {
      setAddDay7("Выходной")
    }
    const {
      target: {value},
    } = event;
    setPersonName7(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(', ') : value,
    );
  };

  const context = useContext(ProjectContextEmployee);

  const [addProjectName, setAddProjectName] = useState("");
  const [addDay1, setAddDay1] = useState("");
  const [addDay2, setAddDay2] = useState("");
  const [addDay3, setAddDay3] = useState("");
  const [addDay4, setAddDay4] = useState("");
  const [addDay5, setAddDay5] = useState("");
  const [addDay6, setAddDay6] = useState("");
  const [addDay7, setAddDay7] = useState("");
  const [addDescription, setAddDescription] = useState("");

  const Protect = () => {
    if (addProjectName == "") {
      setAddProjectName("Нету");
    }
    if (addDay1 == "") {
      setAddDay1("Выходной");
    }
    if (addDay2 == "") {
      setAddDay2("Выходной");
    }
    if (addDay3 == "") {
      setAddDay3("Выходной");
    }
    if (addDay4 == "") {
      setAddDay4("Выходной");
    }
    if (addDay5 == "") {
      setAddDay5("Выходной");
    }
    if (addDay6 == "") {
      setAddDay6("Выходной");
    }
    if (addDay7 == "") {
      setAddDay7("Выходной");
    }
    if (addDescription == "") {
      setAddDescription("Что-то, да есть");
    }
  }

  return (
    <Dialog open={p.open} onClose={hide} fullWidth={true} TransitionComponent={Transition} maxWidth="xs">
      <form onSubmit={(event) => {
        event.preventDefault();
        context.create(event, {
          Name: addProjectName,
          Monday: addDay1.toString(),
          Tuesday: addDay2.toString(),
          Wednesday: addDay3.toString(),
          Thursday: addDay4.toString(),
          Friday: addDay5.toString(),
          Sunday: addDay6.toString(),
          Saturday: addDay7.toString(),
          Description: addDescription
        });
        hide();
      }}>
      <DialogTitle>Добавление проекта, описания и распределения сотрудников</DialogTitle>
        <List style={{padding: 10}}>
          <TextField value={addProjectName}
                     onChange={(event) => {
                       setAddProjectName(event.target.value)
                     }}
                     fullWidth
                     label="Название проекта"
                     variant="filled"/>

          <br/>
          <br/>
          <FormControl sx={{width: "100%"}}>
            <InputLabel id="demo-multiple-chip-label">Понедельник</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip"/>}
              renderValue={(selected) => (
                <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                  {selected.map((value) => (
                    <Chip key={value} label={value}/>
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {contextEmployee.employee.slice().map((name, index) => (
                <MenuItem
                  key={index}
                  value={name.fname + " " + name.lname}
                  style={getStyles(name.fname + " " + name.lname, personName, theme)}
                >
                  {name.fname + " " + name.lname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <br/>
          <br/>
          <FormControl sx={{width: "100%"}}>
            <InputLabel id="demo-multiple-chip-label">Вторник</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={personName2}
              onChange={handleChange2}
              input={<OutlinedInput id="select-multiple-chip" label="Chip"/>}
              renderValue={(selected) => (
                <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                  {selected.map((value) => (
                    <Chip key={value} label={value}/>
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {contextEmployee.employee.slice().map((name, index) => (
                <MenuItem
                  key={index}
                  value={name.fname + " " + name.lname}
                  style={getStyles(name.fname + " " + name.lname, personName, theme)}
                >
                  {name.fname + " " + name.lname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <br/>
          <br/>
          <FormControl sx={{width: "100%"}}>
            <InputLabel id="demo-multiple-chip-label">Среда</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={personName3}
              onChange={handleChange3}
              input={<OutlinedInput id="select-multiple-chip" label="Chip"/>}
              renderValue={(selected) => (
                <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                  {selected.map((value) => (
                    <Chip key={value} label={value}/>
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {contextEmployee.employee.slice().map((name, index) => (
                <MenuItem
                  key={index}
                  value={name.fname + " " + name.lname}
                  style={getStyles(name.fname + " " + name.lname, personName, theme)}
                >
                  {name.fname + " " + name.lname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <br/>
          <br/>
          <FormControl sx={{width: "100%"}}>
            <InputLabel id="demo-multiple-chip-label">Четверг</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={personName4}
              onChange={handleChange4}
              input={<OutlinedInput id="select-multiple-chip" label="Chip"/>}
              renderValue={(selected) => (
                <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                  {selected.map((value) => (
                    <Chip key={value} label={value}/>
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {contextEmployee.employee.slice().map((name, index) => (
                <MenuItem
                  key={index}
                  value={name.fname + " " + name.lname}
                  style={getStyles(name.fname + " " + name.lname, personName, theme)}
                >
                  {name.fname + " " + name.lname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <br/>
          <br/>
          <FormControl sx={{width: "100%"}}>
            <InputLabel id="demo-multiple-chip-label">Пятница</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={personName5}
              onChange={handleChange5}
              input={<OutlinedInput id="select-multiple-chip" label="Chip"/>}
              renderValue={(selected) => (
                <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                  {selected.map((value) => (
                    <Chip key={value} label={value}/>
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {contextEmployee.employee.slice().map((name, index) => (
                <MenuItem
                  key={index}
                  value={name.fname + " " + name.lname}
                  style={getStyles(name.fname + " " + name.lname, personName, theme)}
                >
                  {name.fname + " " + name.lname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <br/>
          <br/>
          <FormControl sx={{width: "100%"}}>
            <InputLabel id="demo-multiple-chip-label">Суббота</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={personName6}
              onChange={handleChange6}
              input={<OutlinedInput id="select-multiple-chip" label="Chip"/>}
              renderValue={(selected) => (
                <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                  {selected.map((value) => (
                    <Chip key={value} label={value}/>
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {contextEmployee.employee.slice().map((name, index) => (
                <MenuItem
                  key={index}
                  value={name.fname + " " + name.lname}
                  style={getStyles(name.fname + " " + name.lname, personName, theme)}
                >
                  {name.fname + " " + name.lname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <br/>
          <br/>
          <FormControl sx={{width: "100%"}}>
            <InputLabel id="demo-multiple-chip-label">Воскренье</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={personName7}
              onChange={handleChange7}
              input={<OutlinedInput id="select-multiple-chip" label="Chip"/>}
              renderValue={(selected) => (
                <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                  {selected.map((value) => (
                    <Chip key={value} label={value}/>
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {contextEmployee.employee.slice().map((name, index) => (
                <MenuItem
                  key={index}
                  value={name.fname + " " + name.lname}
                  style={getStyles(name.fname + " " + name.lname, personName, theme)}
                >
                  {name.fname + " " + name.lname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <br/>
          <br/>
          <TextareaAutosize
            maxRows={10}
            aria-label="maximum height"
            placeholder="Описание проекта"
            style={{height: 100, width: "100%"}}
            value={addDescription}
            onChange={(event => {
              setAddDescription(event.target.value)
            })}/>

          <br/>
          <br/>
          <div style={{display: "flex", justifyContent: "center"}}>
            <Button variant="contained" color="success" type="submit" onClick={() => {Protect()}}>
              Создать проект +
            </Button>
          </div>
        </List>
      </form>
    </Dialog>
  );
}
export default DialogAddProject;