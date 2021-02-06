import React, { useContext } from 'react'
//Components
import Message from './Message'

//Context
import { ChannelContext } from '../../Context/ChannelContext';

export default function MessageList() {

    //Context
    const channelContextState = useContext(ChannelContext);

    return (
        <div className="message-list">
            {
                channelContextState.messages ? 
                channelContextState.messages.map(messageData =><Message  messageData={messageData} key={messageData.id}/>) 
                : null
            
            }
        </div>
    )
}
