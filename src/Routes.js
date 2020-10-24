import React, {useState, useEffect}from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import AppBar from "./Components/AppBar"
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import ToDoList from "./Components/TodoList/Index";
import Dashboard from "./Pages/Dashboard";


import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import { ThemeProvider } from '@material-ui/core/styles';



import { useSelector, useDispatch } from 'react-redux';
import * as actions from './Actions/Auth.Action'


const Routes = () => {

 const dispatch = useDispatch()

 useEffect (() => { 
  dispatch(actions.authCheckState())
     
 
 },  []  );
   
 const auth = useSelector(state=>state.Auth)

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
  
  
   <ThemeProvider theme={theme}>
    <BrowserRouter>
   
        <AppBar/>
        <Switch>
           
            <Route exact path="/" component={Home}  />
            <Route path="/SignUp" exact component={SignUp} />
            <Route path="/SignIn" exact component={SignIn} />
            <Route path="/todolist" exact component={ToDoList}/>
            <Route path="/dashboard" exact component={Dashboard}/>
        </Switch>
        
    </BrowserRouter>
   </ThemeProvider>
  
)

};



export default Routes;