import React, { useState, useEffect, useCallback } from 'react';
import TodoList from './TodoList';
import TodoInput from './TodoInput';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddToDoList from './AddTodoList' 
import { Container } from '@material-ui/core';
import axios from 'axios';
import {initTodoLists, setTodoLists, initCompleteCount, initTotalTasks} from '../../Actions/ToDo.Action'
import { useSelector, useDispatch } from 'react-redux';



export default function ToDoList(props) {

   // const [todoLists, setTodoLists] = useState([])
    // const [todos, setTodos]=useState([])
    

     const dispatch = useDispatch();

     const userId = useSelector(state => state.Auth.userId)
     const todoLists = useSelector(state => state.Todos.todoLists)
     const completeCount = useSelector(state => state.Todos.totalCompletes)
     const totalTasks = useSelector(state =>state.Todos.totalTasks)
   //  const [completeCount , setCompleteCount] = useState(0)
     
    
     

   useEffect (() => { 
       
      dispatch(initCompleteCount(userId));
      dispatch(initTodoLists(userId));
      dispatch(initTotalTasks(userId));
      
    
  },  []  );

  

  return(
    
    <div>
    <Grid
    container
    direction="row"
    justify="space-around"
    alignItems="flex-start"
  >

    <Grid xs={4}  >
    <h1>{completeCount} / {totalTasks}</h1>
    
    <AddToDoList />

    {console.log(todoLists)}
    {
      
      todoLists.map((todo) =>(

        
      <Accordion >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          {todo}
        </AccordionSummary>
       
          <TodoList todoListName={todo}  controlers={true} />
      </Accordion>
       ))}
    </Grid>  
    <Grid xs={6}>
    <Accordion >
    <AccordionSummary
    expandIcon={<ExpandMoreIcon />}
    aria-controls="panel1a-content"
    id="panel1a-header"
  >
    Todays Agenda
  </AccordionSummary>
    <TodoList todoListName='TodaysAgenda' controlers={false}/>
    </Accordion>
    
 
   
    </Grid>
    </Grid>
    </div>
  )
}