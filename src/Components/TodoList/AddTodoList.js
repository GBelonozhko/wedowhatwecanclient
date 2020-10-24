import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import moment from "moment";
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';


export default function AddToDoList(props) {

    const userId = useSelector(state => state.Auth.userId)
   
    const [newtask, setnewtask] = useState({title:'' , creator:userId , task:'create a list' , isComplete:false , isVisible:true })

    const handleChange = (event) => { 
        setnewtask({ [event.target.name]: event.target.value, task:'create a list' , creator:userId });
        console.log(newtask);
    };

    const handleSubmit = () => {
        axios.post('/api/addTodo/' , {newtask})
        setnewtask({title:'' , creator:userId , task:'create a list' , isComplete:false , isVisible:true });
    }

    return(
        <div>
            <form  >
                <TextField fullWidth= {true} variant="standard" label="Add New Todo List" type = "text"  name='title' value={newtask.title} onChange={e => handleChange(e)}  />
               <Button variant="contained" color='primary' onClick={()=>handleSubmit()}>submit</Button>
            </form>
        
        </div>
    )

}