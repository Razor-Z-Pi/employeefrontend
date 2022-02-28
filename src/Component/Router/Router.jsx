import React from 'react';
import ContextAppProvider from "../Context/ContextAppProvider";
import Home from "../../Pages/Home";
import AppSnackbar from "../AppSnackbar/AppSnackbar";
import Navigate from "../Navigate/Navigate";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import NotFound from "../NotPages/NotFound";
import Login from "../../Pages/Login";
import ProjectStatus from "../../Pages/ProjectStatus/ProjectStatus";

const HomeList = () => (
  <ContextAppProvider>
    <Navigate/>
    <Home />
    <AppSnackbar />
  </ContextAppProvider>
);

const LoginRedirect = () => (
  <ContextAppProvider>
    <Login/>
  </ContextAppProvider>
)

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/LoginRedirect"/>
        <Route exact path="/HomeList" component={HomeList}/>
        <Route exact path="/ProjectStatus" component={ProjectStatus}/>
        <Route exact path="/LoginRedirect" component={LoginRedirect}/>
        <Route component={NotFound}/>
      </Switch>
    </BrowserRouter>
  )
};

export default Router;