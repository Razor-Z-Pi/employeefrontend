import React, {Component} from 'react';
import {Link, Route} from "react-router-dom";
import {
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import Home from "./Home";

class Login extends Component {
  render() {
    return (
      <Router>
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
              <button type="button" className="" >
                <Link to="/Home">Войти</Link>
              </button>
            </form>
          </section>
        </div>
      </div>

        <Switch>
          <Route path="/Home">
            <Home/>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default Login;