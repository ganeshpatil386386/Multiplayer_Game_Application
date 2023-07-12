import React, { useState } from 'react';
import Board from './Board';
import "./Chat.css"; 
import { Window, MessageList, MessageInput } from 'stream-chat-react';

function Game({channel}) {
  const [playersJoined, setPlayersJoined] = useState(channel.state.watcher_count == 2);

  const [result, setResult] = useState({winner: "none", state: "none" })


  channel.on("user.watching.start", (event) => {
    setPlayersJoined(event.watcher_count ===2 )

  })

  if (!playersJoined) {
    return <div className=""> Waiting for other Palyer</div>
  }
    return 
    <div className='gameContainer'>
      <Board result ={result} setResult={setResult}/>
      <Window>
        <MessageList disableDateSeparator /> 
        <MessageInput noFiles />
     </Window>
      
    </div>
  
}

export default Game
