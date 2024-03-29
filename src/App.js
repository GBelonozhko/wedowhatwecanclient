import React, {useState, useEffect}from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import AppBar from "./Components/AppBar"

import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import ToDoList from "./Components/TodoList/Index";

import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import { ThemeProvider } from '@material-ui/core/styles';

import { Provider } from 'react-redux';
import store from "./Store/Store";

import Routes from './Routes';

import { useSelector, useDispatch } from 'react-redux';
import * as actions from './Actions/Auth.Action'

const App = () => {

   

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: green,
  },
  status: {
    danger: 'orange',
  },
});



return ( 
  <Provider store={store}>
  
  <Routes/>

  </Provider>
)

};

export default App;