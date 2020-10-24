import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { signout, isAuthenticated } from "../Core/Auth";
import {logout} from '../Actions/Auth.Action';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  const userId = useSelector(state => state.Auth.userId)

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            We Do What We Can
          </Typography>
          { /*isAuthenticated() && isAuthenticated().user.role === 1 && (
            <Button color="inherit"
            style={{ cursor: "pointer", color: "#ffffff" }}
                href="/admin/dashboard"

            >
              admin Dashboard
            </Button>
        
    )*/}

     {userId && (
            <Button color="inherit"
                href="/dashboard"
                
            >
                Dashboard
            </Button>
        
    )}
    
    {userId && (
        
            <Button color="inherit"
                 style={{ cursor: "pointer", color: "#ffffff" }}
                
                onClick={() =>
                  logout()
                }
                href='/'
            >
                Signout</Button>
      
    )}

    
    {!userId && (
      <div>
     

                <Button color="inherit"
                href="/signup"
            >
                Register
            </Button>
                / 
                
               
          </div>

            
    )}


     {!userId && (
     
       
                <Button
                 
                color="inherit"
                href="/signin"
                className='mr-3'
                > login</Button>

            
    )}
        </Toolbar>
      </AppBar>
    </div>
  );
}