import React, {useState} from "react";
import {Dialog, DialogContent, DialogTitle, InputLabel, Select, TextField} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import {Password} from "@mui/icons-material";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";

const DialogLogin = (p) => {

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const hide = () => {
    p.setLoginShow(false)
  }
  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value);
  };

  const PutLogin = (props, login, password, role) => {
    props.preventDefault();
    axios.post("http://127.0.0.1:8000/auth/Register", {
      Name: login,
      Password: password,
      Role: role
    }).then(response => {
      console.log(response.data);
      if (response.data.message == "good") {
        hide();
      }
    }).catch(error => {
      console.error(error);
    })
  }

  return (
    <Dialog open={p.open} fullWidth={true} maxWidth="sm">
      <form onSubmit={props => PutLogin(props, login, password, role)}>
        <DialogTitle>
          Регистрация
        </DialogTitle>
        <DialogContent>
          <TextField style={{marginBottom: 10}} fullWidth={true} value={login} label="Логин" onChange={props => setLogin(props.target.value)}></TextField>
          <TextField fullWidth={true} value={password} label="Пароль" onChange={props => setPassword(props.target.value)}></TextField>
          <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
            <InputLabel id="demo-simple-select-standard-label">Роль</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={role}
              onChange={handleChange}
              label="Роль"
            >
              <MenuItem value={1}>Администратор</MenuItem>
              <MenuItem value={2}>Сотрудник</MenuItem>
            </Select>
          </FormControl>
          <br/>
          <div style={{display:"flex",justifyContent: "center"}}>
            <Button type="submit" variant="contained" color="success">
              Зарегистрировать
            </Button>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  )
}

DialogLogin.propType = {
  open: PropTypes.bool.isRequired,
  setDescriptionShow: PropTypes.func.isRequired,
  props: PropTypes.object,
}

export default DialogLogin;