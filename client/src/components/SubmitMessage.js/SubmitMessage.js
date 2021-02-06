import React, { useState, useContext, useEffect } from 'react'

//Context
import { ChannelContext } from '../../Context/ChannelContext';

export default function SubmitMessage() {

    //Context
    const channelContextState = useContext(ChannelContext)    


    //Message Input State
    const [messageText, setMessageText] = useState("");


    //Input Change Handler
    const handleChange = (e) =>{
        setMessageText(e.target.value);
    }



    //Save Message to server & to context for Active channel
    const handleSubmit = (e) =>{
        e.preventDefault();
        setMessageText(e.target.value);

        //New Message Object
        const newMessage = {
            id : Math.floor(Math.random() * 10000) + 1 ,
            time : new Date().toTimeString(),
            body : messageText,            
        }


        //Save to state 
        const channelData = {...channelContextState, messages : [ ...channelContextState.messages, newMessage]};
        channelContextState.setChannel(channelData);
        setMessageText("");

        //Save to server
        fetch(`http://localhost:8081/${channelContextState.id}`, {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(channelData)
        })
        .then( (response) => { 
        });
    }



    return (
        <div className="submit-message">
            <form className="form-control"  onSubmit={handleSubmit}>
                <input 
                className="submit-message-input" 
                type="text" 
                placeholder="Type your message..."
                onChange={handleChange}
                value={messageText}/>
                <button className="submit-button" disabled={(!messageText || !channelContextState.id)} ></button>
            </form>
        </div>
    )
}
