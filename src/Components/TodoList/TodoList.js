import React, { useState, useEffect, useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import {subscribe} from '../../Core/apiSubscribe';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import '../../App.css';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { FaTrashAlt } from 'react-icons/fa';
import moment from "moment";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {setCompleteCount, initTotalTasks} from '../../Actions/ToDo.Action';
import { Container,ListItem, List, ListSubheader, Divider,Checkbox, Typography, IconButton   } from '@material-ui/core';
import { updateObject } from '../../shared/utility';
import TimeModal from '../ActivityTracker/Modal'



export default function ToDoList(props) {

  
 // const todos = useSelector(function(state) { return state.Todos });
  
 const userId = useSelector(state => state.Auth.userId)
 const dispatch = useDispatch();

  const [todos, setTodos] = useState([])

  const [isLoading , setIsLoading] = useState(false)

    
  useEffect (() => { 
     axios.get(`/api/todolist/${userId}/${props.todoListName}`)
      .then(res => setTodos(res.data.todoData))
      
      
  },  []  );



  
  const handleArchiveComplete = (archiveStatus) => {
    let isVisibleData=archiveStatus;
    
    axios.patch(`api/archiveTodo/${props.todoListName}`,{isVisibleData})
      .then(
        axios.get(`/api/todolist/${userId}/${props.todoListName}`)
      .then(res => setTodos(res.data.todoData))

      )}
     

  const handleComplete = (todo) => {
    let isCompleteData=true;
    todo.isComplete==isCompleteData? isCompleteData=false:isCompleteData=true;  
    
    axios.patch(`api/CompleteTodo/${todo._id}`,{isCompleteData})
      .then(res => {
        axios.get(`api/todolistCompletes/${userId}`)
        .then(res => {
          dispatch(setCompleteCount(res.data.Completes))
        })  
      })
     let dtodos =todos.map((dtodo, i)=> dtodo._id==todo._id?{...todo, isComplete:isCompleteData}:todos[i]);
      setTodos(dtodos);
      
    
};

const handleDelete = (todo, i) => {
  
    axios.delete(`/api/deletetodo/${todo}`)
    .then(
      setTodos( prevTodos => prevTodos.filter(ftodos => ftodos._id !==todo))
      
    ).then(
      dispatch(initTotalTasks(userId))
    )


   
};

 // const handleFakeDelete = (todo) => { 
 //   
 //   axios.patch(`/api/editTodo/${todo._id}`, {...todo, isVisible: false})
 //   .then(function(response) {
 //    // dispatch(updateTodo(todo));
 //   })
 //   .catch(function(error) { console.log(error); });
 //   
 //   let dtodos =todos.map((dtodo, i)=> dtodo._id==todo._id?{...todo, isVisible:false}:todos[i]);
 //   setTodos(dtodos);
 // }

 
  const [newtask, setNewTask] = useState({title:props.todoListName , task:'' , isComplete:false , isVisible: true , creator:userId })

  const handleSubmit = (e) => {
    setIsLoading(true)
    axios.post('/api/addTodo' , {newtask} )
      .then(res => {
        console.log(res.data)
        let ftodos = todos;
        ftodos.push(res.data)
        console.log(ftodos)
        setTodos(ftodos)
        dispatch(initTotalTasks(userId))
        setIsLoading(false)
        setNewTask({title:props.todoListName , task:'' , isComplete:false , isVisible: true , creator:userId})
      })

      
     

  }


  function handleChange(event) { 
    setNewTask({ ...newtask, [event.target.name]: event.target.value});
    
  }
 
  const archive = true;

      return(
        
        <div className='TDLbackground'>
        <Container maxWidth='sm'>
        {props.controlers==true &&
        <div>
          
                <TextField fullWidth= {true} variant="outlined" label="Add New Todo" type = "text"  name='task' value={newtask.task} onChange={e => handleChange(e)} onKeyDown = {(e) => {e.keyCode==13 && handleSubmit()}} />
                <Button onClick={handleSubmit} > submit </Button>      <Button onClick={() => handleArchiveComplete(false)} > Archive Complete </Button> <Button onClick={() => handleArchiveComplete(true)} > UnArchive Complete </Button>
                <Divider/>
        
        </div>
        }  
        
        <List>
       
     
             {
                 todos.map((todo, i) =>(
                <div>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                    {todo.isVisible==true?
                    <ListItem key={i} > 

                      <Grid xs={2}> 
                        <IconButton size='small' onClick = {()=>handleDelete(todo._id, i)}>
                          <FaTrashAlt />
                        </IconButton> 
                      </Grid>
                      
                      <Grid xs={9} >
                        <Typography className={todo.isComplete ? 'complete' : null} align='center'  onClick={()=>handleComplete(todo)}>
                           {todo.task} <br/> {moment(todo.createdAt).fromNow(true)} ago 
                        </Typography>
                      </Grid>  
                    { todo.isComplete==false?
                      <Grid xs={1}>
                      <TimeModal/>
                      
                    </Grid> 
                    :<Grid xs={1} />
                    }
                    <Grid xs={1}>
                        
                        <Checkbox onChange={()=>handleComplete(todo)} checked= {todo.isComplete}/>
                      </Grid>  
                    </ListItem>
                    :null}
                </Grid>
                    
                    
                    </div>
                ))

             }

        </List>
            
        
        </Container>
       </div>
       
    )
};