import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import {subscribe} from '../Core/apiSubscribe';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux'
import {subscribeNL} from '../Actions/SubscribeNL.Action';
import axios from 'axios';

export default function SubscribeTextField(props) {

    const initialState = { email: '' }
    const [subscribe, setSubscribe] = useState(initialState) 
    const dispatch = useDispatch(); 
  


    function handleSubmit(event) { 
        event.preventDefault();
        
        axios.post('/api/subscribe', {email:subscribe.email})
          .then(function(response) {
            dispatch(subscribeNL(response.data));
          })
          .then(function() {
            props.history.push("/")
          })
          .catch(function(error) { console.log(error); });    
      };


    const handleChange = (event) => {
        setSubscribe({...subscribe, [event.target.name]: event.target.value});
    };
   
    

    return(
        <form  onSubmit={handleSubmit}>
                                    <div className="input-area">
                                        <input required type="email" className=" newsletter-email " name="email" onChange={e => handleChange(e)} value={subscribe.email} placeholder="Enter your email" />
                                    </div>
                                    <div className="button-area">
                                        <span className="input-group-btn">
                                        <button className="btn btn-icon "  type="submit">submit</button>
                                        </span>
                                        <span className="newsletter-spinner spinimg-pgs_newsletter_widget_2" />
                                    </div>
                                    </form>



    )
}