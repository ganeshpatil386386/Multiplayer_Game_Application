import React, {useEffect, useState} from 'react';
import Square from './Square';
import { Patterns } from '../WinningPatterns';
import {useChannelStateContext, useChatContext} from "stream-chat-react";

function Board({result, setResult}) {
  const [board,setBoard] = useState(["", "","","","","","","",""]);
  const [player,setPlayer] = useState("X");
  const [turn,setTurn] = useState("X");

  const { channel } = useChannelStateContext();
  const {client} = useChatContext()

  useEffect (() => {
    checkWin();
    checkIfTie();
  },[board]);


  const chooseSquare = async (square) => {
    if(turn === player && board[square] === ""){
        setTurn(player === "X" ? "O" : "X");
        

        await channel.sentEvent({
            type: "game-over",
            data: {square, player},
        });
        setBoard(board.map((val,idx)=> {
            if(idx === square && val === "" ){
                return player
            }
            return val;
        })
        )
    }

  };

   const checkWin = () => {
    Patterns.forEach((currtPattern) => {
        const firstPlayer = board[currtPattern[0]]
        if(firstPlayer == "") return
        let foundWinningPattern = true;
        currtPattern.forEach((idx) => {
            if(board[idx] != firstPlayer) {
                foundWinningPattern = false;
            }
        });

        if (foundWinningPattern){
            alert("Winner", board[currtPattern[0]] )
            setResult ({winner: board[currtPattern[0]], state: "won"}); 
        }
    })
   }

   const checkIfTie = () => {
    let filled = true
    board.forEach((square) => {
        if(square == ""){
            filled = false;
        }
    });

    if(filled){
        alert("Game Tied")
        setResult({winner: "none", state: "tie"})
    }
   }

    channel.on((event) => {
        if (event.type == "game-move" && event.user.id !== client.userID){
            const currentPlayer = event.data.player === "X" ? "O" : "X";
            setPlayer(currentPlayer);
            setTurn(currentPlayer);

            setBoard(
                board.map((val,idx) => {
                    if(idx === event.data.square && val === "" ){
                        return event.data.player;
                    }
                    return val;
                })
                 
                
         
                );
            
        }
    });

    return (
    <div className='board'>
      <div className='row'>
        <Square chooseSquare={() => {
            chooseSquare(0);
        }} val={board[0]} /> 

        <Square chooseSquare={() => {
            chooseSquare(1);
        }}val={board[1]}/> 

        <Square chooseSquare={() => {
            chooseSquare(2);
        }}val={board[2]}/>

      </div>

      <div className='row'>
        <Square 
        chooseSquare={() => {
            chooseSquare(3);
        }}val={board[3]}/>

        <Square chooseSquare={() => {
            chooseSquare(4);
        }}val={board[4]}/>

        <Square chooseSquare={() => {
            chooseSquare(5);
        }}val={board[5]}/>

      </div>

      <div className='row'>
        <Square chooseSquare={() => {
            chooseSquare(6);
        }}val={board[6]}/>

        <Square chooseSquare={() => {
            chooseSquare(7);
        }}val={board[7]}/> 
         
        <Square chooseSquare={() => {
            chooseSquare(8);
        }}val={board[8]}/>

      </div>
    </div>
  )
}

export default Board
