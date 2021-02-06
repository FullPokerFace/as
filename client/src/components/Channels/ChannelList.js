import { useRef, useState, useContext, useEffect } from 'react'

//Components
import Channel from "./Channel";

//Context
import { ChannelContext } from '../../Context/ChannelContext';

 
 export default function ChannelList() {
    // Refs
    const channelListContainer = useRef(null);
    const channelListArrow = useRef(null);

    //States
    const [selectedChannelTitle, setSelectedChannelTitle] = useState("Channel List")
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [channelList, setChannelList] = useState([])


    //Context
    const channelContextState = useContext(ChannelContext)

    //Effect
    
    useEffect(() => {
        // Get Channel List from server
        fetch("http://localhost:8081/channels",{
            method: "get"
        })
        .then(response => response.json())
        // Store results in state
        .then(data => {
            setChannelList(data)        
        });
      });

    
    //Utility Functions
 
    //String To sentense Case
    const toSentenseCase = (s) =>{
        const result = s.toLowerCase().split(" ").map(word => {
            return word.charAt(0).toUpperCase()+word.slice(1);
        }).join(" ")
        return result
    }

    // Toggle Show/Hide Channel List in the Header
    const toggleChannelList =() =>{
        setIsMenuOpen(!isMenuOpen);
        if (!isMenuOpen) {
            channelListContainer.current.classList.add('closed');
            channelListArrow.current.classList.add('closed');
        } else {
            channelListContainer.current.classList.remove('closed');
            channelListArrow.current.classList.remove('closed');
        }

    }


    //Get Channel Title To display in Header
    const getTitle = (title) =>{
        setSelectedChannelTitle(toSentenseCase(title));
    }


    //Set Channel as Active and retrieve all messages associated with channel from server
    const setChannel = (channel) =>{
        fetch(`http://localhost:8081/messages/${channel.id}`,{
            method: "get"
        })
        .then(response => response.json())
        .then(data => {
            channelContextState.setChannel(data[0]);
                       
        });
        toggleChannelList();
        
    }

    

     return (
         <div className="nav">
             <div className="channel-list-label" onClick={toggleChannelList}>{selectedChannelTitle}
             <span className="channel-select-arrow" ref={channelListArrow}></span>
             </div>
             <div className="channel-list-container" ref={channelListContainer}>
                {
                    channelList.map(channel =>
                    <Channel 
                        getTitle = {getTitle} 
                        setChannel = {setChannel}
                        channel={channel} key={channel.id}
                    />
                    )
                }
              </div>
         </div>
     )
 }
 