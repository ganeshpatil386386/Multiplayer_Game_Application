import { useState } from 'react';
import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { StreamChat } from 'stream-chat';
import {Chat} from 'stream-chat-react'
import Cookies from 'universal-cookie';
import JoinGame from './components/JoinGame';


function App() {
  const api_key = "n9s6tptj8k3z";
  const cookies = new Cookies();
  const token = cookies.get("token");
  const client = StreamChat.getInstance(api_key);

  const [isAuth, setIsAuth] = useState(false);
  const logout = () => {
            cookies.remove("token");
            cookies.remove("userId");
            cookies.remove("firstName");
            cookies.remove("lastName");
            cookies.remove("username");
            cookies.remove("hashedPassword");
            cookies.remove("channelName");
            client.disconnectUser();
            setIsAuth(false);
  };

  if(token){
    client.connectUser
    (
      {
      id: cookies.get("userId"),
      name: cookies.get("username"),
      firstName: cookies.get("firtsName"),
      lastname: cookies.get("lastname"),
      hashedPassword: cookies.get("hashedPassword"),
      

    },
    token
  ).then((user) => {
    setIsAuth(true);
  })

    
  }


  return (
    <div className="App">
      {isAuth ? (
       <Chat client={client}>
         
      <JoinGame />
      <button onClick={logout}> Log Out</button>
      </Chat>
       ) : (
        <>

      <SignUp setIsAuth = {setIsAuth} />
      <Login setIsAuth = {setIsAuth} />
      </>
      )}
    </div>
  );
}

export default App;
