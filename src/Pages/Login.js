import React, {Component, useEffect, useState} from 'react';
import {Alert, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import "../App.css";
import axios from "axios";

// import {login} from "../Api/Authorization";

function Login() {

  const [user, setUser] = useState(""); //значение input
  const [password, setPassword] = useState("");
  const [userDirty, setUserDirty] = useState(false); //отражает были мы в input
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [userError, setUserError] = useState("Логин не должно быть пустым"); //Уведомления об о ошибки
  const [passwordError, setPasswordError] = useState("Пароль не должен быть пустым");
  const [formValid, setFormValid] = useState(false); // состояние кнопки

  // разблокировка кнопки или нет???
  useEffect(() => {
      if (userError || passwordError) {
        setFormValid(false);
      } else {
        setFormValid(true);
      }
    },
    [userError, passwordError]);

  // слушатели на не корректный ввод
  const userHandler = (e) => {
    setUser(e.target.value);
    const sec = /^\S*$/;
    if (!sec.test(String(e.target.value).toLowerCase())) {
      setUserError("Не корректный ввод");
    } else {
      setUserError("");
    }
  }

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    const sec = /^\S*$/;
    if (e.target.value.length < 10) {
      setPasswordError("");
      if (!e.target.value || !sec.test(String(e.target.value).toLowerCase())) {
        setPasswordError("Не корретный ввод");
      }
    } else {
      setPasswordError("Пароль не больше 8 цифр");
    }
  }
  //Когда пользователь покинул поле
  const blurHandler = (e) => {
    switch (e.target.name) {
      case "user":
        setUserDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
    }
  }

  const handleSubmit = props => {
    props.preventDefault();

    axios.post("https://127.0.0.1:8000/api/employees", {
      login: user,
      Password: password
    }).then(res => {
      console.log(res);
      console.log(res.data);
    })
  }

  return (
    <div>
      <div className="App">
        <form method="POST" onSubmit={props => handleSubmit(props)} action="" className="FormApp">
          <h1>Авторизация</h1>
          <TextField
            className="Login"
            id="input-with-sx"
            label="Логин"
            name="user"
            onChange={e => userHandler(e)}
            onBlur={e => blurHandler(e)}
            value={user}
            type="text"
            required/>
          <br/>
          <TextField
            className="Password"
            autoComplete="current-password"
            label="Пароль"
            id="outlined-password-input"
            onChange={e => passwordHandler(e)}
            onBlur={e => blurHandler(e)}
            name="password"
            value={password}
            type="password"
            required/>
          <br/>
          <Button
            name="authBTN"
            type="submit"
            disabled={!formValid}
            variant="contained"
            color="success">Войти</Button>
        </form>
      </div>

      <div>
        {
          (userError && userDirty) && <Alert className="AppMessage" severity="error">{userError}</Alert>
        }
        {
          (passwordError && passwordDirty) && <Alert className="AppMessage" severity="error">{passwordError}</Alert>
        }
      </div>
    </div>
  );
}


// static async Login() {
//   await login(this.state.login, this.state.password);
// }


export default Login;