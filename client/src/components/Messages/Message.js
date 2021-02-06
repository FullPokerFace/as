 import React from 'react'
 
 export default function Message({messageData}) {
     return (
         <div className="message">
             
             <p className="time">{messageData.time}</p>
             <p className="text">{messageData.body}</p>
         </div>
     )
 }
 