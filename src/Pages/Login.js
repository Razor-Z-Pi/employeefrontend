import React, {useEffect, useState} from 'react';
import {Alert, Backdrop, CircularProgress, FormControlLabel, FormGroup, Switch, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import "../App.css";
import {AppBar, Toolbar, Typography} from "@material-ui/core";
import {Redirect} from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";

const API_URL = "http://127.0.0.1:8000/auth/login";

const Login = () =>  {

  const [user, setUser] = useState(""); //значение input
  const [password, setPassword] = useState("");
  const [userDirty, setUserDirty] = useState(false); //отражает были мы в input
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [userError, setUserError] = useState("Логин не должно быть пустым"); //Уведомления об о ошибки
  const [passwordError, setPasswordError] = useState("Пароль не должен быть пустым");
  const [formValid, setFormValid] = useState(false); // состояние кнопки

  const [blockAuth, setBlockAuth] = useState(false);
  const [redirectPut, setRedirectPut] = useState(false);
  const [redirectEmployee, setRedirectEmployee] = useState(false);

  const [loading, setLoading] = useState(false);

  function handleClick() {
    setLoading(true);
  }

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

  const login = (props, user, password) => {
    props.preventDefault();
    if (user == "admin" && password == "123") {
      console.log("Good");
      localStorage.setItem("Admin", "Администратор");
      setRedirectPut(true);
    }
    axios.post(API_URL, {
        login: user,
        Password: password
      }
    )
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        if (response.data.message.level === "good") {
          if (response.data.Role == 1) {
            localStorage.setItem("Admin", "Администратор");
            setRedirectPut(true);
          }
          if (response.data.Role == 2) {
            localStorage.setItem("Admin", user);
            setRedirectEmployee(true);
          }
          setBlockAuth(false);
        } else {
          setRedirectPut(false);
          setBlockAuth(true);
          setLoading(false);
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
        <form method="POST" onSubmit={props => {
          login(props, user, password);
        }}
              action=""
              className="FormApp">
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
          <Box>
            <Button
              name="authBTN"
              type="submit"
              disabled={!formValid}
              loading={loading}
              variant="contained"
              color="success"
              onClick={handleClick}>
                Войти
            </Button>
          </Box>
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

      {
        (redirectEmployee && <Redirect to="/EmployeeList" />)
      }

      {loading && (<Backdrop
        open={loading}
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>)}
    </div>
  );
}

export default Login;