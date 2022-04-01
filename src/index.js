import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore} from "redux";
import {Provider} from "react-redux";
import Reducer from "./Redux/Reducer";
import ContextAppProvider from "./Component/Context/ContextAppProvider";


const store = createStore(Reducer);

const app = (
  <Provider store={store}>
    <ContextAppProvider>
      <React.StrictMode>
        <App/>
      </React.StrictMode>
    </ContextAppProvider>
  </Provider>
);

ReactDOM.render(
  app,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
