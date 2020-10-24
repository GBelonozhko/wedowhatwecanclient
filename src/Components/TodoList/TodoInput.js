import React, { useState } from 'react';
import {addTodo, removeTodo, updateTodo, setTodos, initTotalTasks} from '../../Actions/ToDo.Action';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { isAuthenticated } from "../../Core/Auth";
import Divider from '@material-ui/core/Divider';

export default function ToDoListInput(props) {
   
    let user = { _id:'Guest', lastname:'Guest', email:'Guest@gmail.com', role:0}    
    if(isAuthenticated())
       {
           user=isAuthenticated();
       }
  
          const token = isAuthenticated().token;
  
          const userId = useSelector(state => state.Auth.userId)
   
    const [newtask, setNewTask] = useState({title:'', task: '', isComplete: false, isVisible: true, user: user._id })
    const dispatch = useDispatch(); 
 
    const handleSubmit = () => {
   
       
        axios.post('/api/addTodo', newtask )
          .then(
           dispatch(initTotalTasks(userId))
          )
             
          
      }
  
      function handleChange(event) { 
        setNewTask({ [event.target.name]: event.target.value});
      }
    

    return(
        <div>
          <form onSubmit={handleSubmit}>
                <TextField fullWidth= {true} variant="outlined" label="Add New Todo" type = "text"  name='task' value={newtask.task} onChange={e => handleChange(e)}  />
                <Divider/>
          </form>
        </div>
    )
}