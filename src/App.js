import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, BrowserRouter
} from "react-router-dom";
import Home from "./Pages/Home";

function Linker() {
  return(
    <Router>
      <Route path="/Home">
        <Home />
      </Route>
    </Router>
  );
}


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <div className="Authorization">
        <section className="modal">
          <h1>Авторизация</h1>
          <form method="POST">
            <div>
              <label>Логин</label>
              <input type="text"  placeholder="Логин" />
            </div>
            <div>
              <label>Пароль</label>
              <input type="text" placeholder="Пароль" />
            </div>
            <button type="button" className="" onClick={Linker()}>Войти</button>
          </form>
        </section>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
