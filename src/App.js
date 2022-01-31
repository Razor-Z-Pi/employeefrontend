import './App.css';
import React, {useEffect, useState} from "react";
import Header from "./Component/Header";

function App() {

  const [user, setUser] = useState(""); //значение input
  const [password, setPassword] = useState("");
  const [userDirty, setUserDirty] = useState(false); //отражает были мы в input
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [userError, setUserError] = useState("Имя не должно быть пустым"); //Уведомления об о ошибки
  const [passwordError, setPasswordError] = useState("Пароль не должен быть пустым");
  const [formValid, setFormValid] = useState(false); // состояние кнопки

  // разблокировка кнопки или нет???
  useEffect(() => {
    if (userError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [userError, passwordError]);

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

    if (e.target.value.length < 8) {
      setPasswordError("");
      if (!e.target.value || !sec.test(String(e.target.value).toLowerCase())) {
        setPasswordError("Не корретный ввод");
      }
    } else {
      setPasswordError("Пароль не больше 8 цифр");
    }
  }

  //Когда пользователь покинул поле ввода
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

  return (
    <div className="App">
      <form action="" className="FormApp">
        <h1>Авторизация</h1>
        {
          (userError && userDirty) && <div style={{color:"red"}}>{userError}</div>
        }
        <input onChange={e => userHandler(e)} value={user} onBlur={e => blurHandler(e)} name="user" type="text"/>
        {
          (passwordError && passwordDirty) && <div style={{color:"red"}}>{passwordError}</div>
        }
        <input onChange={e => passwordHandler(e)} value={password} onBlur={e => blurHandler(e)} name="password" type="password"/>
        <button disabled={!formValid} type="submit">Войти</button>
      </form>
    </div>
  );
}

export default App;
