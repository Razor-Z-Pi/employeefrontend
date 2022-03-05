import React, {useEffect, useState} from 'react';
import {Alert, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import "../App.css";
import axios from "axios";
import {AppBar, Toolbar, Typography} from "@material-ui/core";
import {Redirect} from "react-router-dom";

const Login = () =>  {

  const [user, setUser] = useState(""); //значение input
  const [password, setPassword] = useState("");
  const [userDirty, setUserDirty] = useState(false); //отражает были мы в input
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [userError, setUserError] = useState("Логин не должно быть пустым"); //Уведомления об о ошибки
  const [passwordError, setPasswordError] = useState("Пароль не должен быть пустым");
  const [formValid, setFormValid] = useState(false); // состояние кнопки

  const [redirectPut, setRedirectPut] = useState(false); // Переход с авторизации
  const [blockAuth, setBlockAuth] = useState(false); // Если не прошёл проверку авторизации

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


  // Отправка данных с полей для проверки, сотрудника в БД
  const handleSubmit = props => {
    props.preventDefault();

    console.log(user);
    console.log(password);

    axios.post("https://127.0.0.1:8000/auth/login", {
        login: user,
        Password: password
      }
    )
      .then(response => {
        console.log(response);
        if (response.data.message.level === "good") {
          setBlockAuth(true);
          setRedirectPut(true);
        } else {
          setRedirectPut(false);
          setBlockAuth(true);
        }
      }).catch(error => {
      console.error(error);
    });
  }

  return (
    <div>
      <AppBar>
        <Toolbar>
          <Typography  variant="h6">
            Планировщик рабочей недели!!!
          </Typography>
        </Toolbar>
      </AppBar>

      <br/>
      <br/>
      <br/>
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
        {
          blockAuth && <Alert className="AppMessage" severity="error">Не правильно введён пароль и логин!!!</Alert>
        }
      </div>

      {
        (redirectPut && <Redirect to="./HomeList" />)
      }
    </div>
  );
}

export default Login;