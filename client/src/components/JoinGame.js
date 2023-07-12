import React, { useState } from 'react';
import {useChatContext, Channel} from 'stream-chat-react';
import Game from './Game';

function JoinGame() {
  
 const[rivalUsername, setRivalUsername] = useState("")
 const {client} = useChatContext();
 const [channel, setChannel] = useState(null)
 const createChannel = async () => {
    const resposne = await client.queryUsers({name: {$eq: rivalUsername}});

    if(Response.users.length === 0){
      alert("User not found")
      return
    }

    const newChannel = await client.channel("messaging", {
      members: [client.userID, resposne.users],

    });

    await newChannel.watch();
    setChannel(newChannel);

  };
  return (
    <>
    {channel ? ( 
    <Channel channel={channel}> 
    <Game channel={channel} /> 
    </Channel>
    ) : ( 
   
    <div className='joinGame'>
      <h4> Create Game</h4>
      <input type="text" placeholder='Username of rival...' 
      onChange={(event) => {setRivalUsername(event.target.value)
      }} 
      />
      <button onClick={createChannel}>Join/Start Game </button>
    </div>
    )}
    </>
  )

}

export default JoinGame;
