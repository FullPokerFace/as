

import '../src/css/app.css'
import ChannelList from './components/Channels/ChannelList';
import MessageList from './components/Messages/MessageList';
import SubmitMessage from './components/SubmitMessage.js/SubmitMessage';

import { ChannelContextProvider } from '../src/Context/ChannelContext';


function App() {
  return (
    <div className="app"> 
      {/* Wrap Components in Context */}
      <ChannelContextProvider>
      <ChannelList/>
      <MessageList/>
      <SubmitMessage/>
      </ChannelContextProvider>
    </div>
  );
}

export default App;
