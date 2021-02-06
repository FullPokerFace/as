import React from 'react'

export default function  (props) {

    const {title} = props.channel;

    return (
    <div className="channel" onClick={()=>{
        props.getTitle(title);
        props.setChannel(props.channel);
        }}>
               {title.toUpperCase( )}
        </div>
    )
}
