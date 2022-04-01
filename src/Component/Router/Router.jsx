import React from 'react';
import ContextAppProvider from "../Context/ContextAppProvider";
import Home from "../../Pages/Home";
import AppSnackbar from "../AppSnackbar/AppSnackbar";
import Navigate from "../Navigate/Navigate";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import NotFound from "../NotPages/NotFound";
import Login from "../../Pages/Login";
import ProjectStatus from "../../Pages/ProjectStatus/ProjectStatus";
import ContextAppProjectProvider from "../Context/ContextAppProjectProvider";
import Analysis from "../Analysis/Analysis";
import EmployeeList from "../EmployeeList/EmployeeList";

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

const Day = () => (
  <ContextAppProjectProvider>
    <ProjectStatus/>
  </ContextAppProjectProvider>
)

const Analyst = () => (
  <Analysis />
)

const Employee = () => (
  <ContextAppProjectProvider>
    <EmployeeList/>
  </ContextAppProjectProvider>

)

const Router = () => {
  return (
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to="/LoginRedirect"/>
          <Route exact path="/HomeList" component={HomeList}/>
          <Route exact path="/ProjectStatus" component={Day}/>
          <Route exact path="/LoginRedirect" component={LoginRedirect}/>
          <Route exact path="/Analysis" component={Analyst}/>
          <Route exact path="/EmployeeList" component={Employee} />
          <Route component={NotFound}/>
        </Switch>
      </BrowserRouter>
  )
};

export default Router;