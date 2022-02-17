import React, {Component} from "react";
import ContextAppProvider from "./Component/Context/ContextAppProvider";
import TableEmployee from "./Component/TableEmployee/TableEmployee";
import Home from "./Pages/Home";
import {CssBaseline} from "@material-ui/core";

class App extends Component {
  render() {
    return (
      <ContextAppProvider>
        <CssBaseline>
          <Home />
        </CssBaseline>
      </ContextAppProvider>
    );
  }
}


export default App;
