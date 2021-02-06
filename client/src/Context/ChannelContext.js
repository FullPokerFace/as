import { useState, createContext } from 'react'


// Context for storing CHannel that is selected at the moment

//Init Context
export const ChannelContext = createContext({
    id : null,
    title : '',
    typedMessage : "",
    messages : [],
    setChannel : ()=>{}
})

// Context for storing Channel that is selected at the moment
export const ChannelContextProvider = ({children}) =>{

    //Function to mutate State
    const setChannel = channel => {
        setState({...state, ...channel})
    }
    
    //Inital State
    const initState = {
        id : null,
        title : '',
        typedMessage : "",
        messages : [],        
        setChannel : setChannel
    }

    //State of the context
    const [state, setState] = useState (initState)

    // Export context with Children
    return (
        <ChannelContext.Provider value={state}>
            {children}
        </ChannelContext.Provider>
    )

}