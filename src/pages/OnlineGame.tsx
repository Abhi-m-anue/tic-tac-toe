import Board from "@/components/Board";
import GameContext from '../contexts/GameContext';
import { useContext, useEffect, useState } from "react";
import socket from "@/api/socket";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Circle, X } from "lucide-react";

const OnlineGame = () => {
  const [board, setBoard] = useState<string[]>(Array(9).fill("null"));
  const { isPlayerHost, roomCode} = useContext(GameContext);

  const [playerChoice,setPlayerChoice] = useState<string>("")
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(false)
  const [opponentWon,setOpponentWon] = useState<boolean>(false);
  const [playerWon,setPlayerWon] = useState<boolean>(false)
  const [isDraw,setIsDraw] = useState<boolean>(false)

  const handleGame = (index: number) => {
    if(!isPlayerTurn || opponentWon || playerWon || isDraw){
        return;
    }
    const newBoard = [...board]
    newBoard[index] = playerChoice;
    setBoard(newBoard)
    setIsPlayerTurn(false)
    socket.emit('playerMoved',index,roomCode)
    if(winCheck(newBoard)){
      setPlayerWon(true)
      socket.emit('playerWon',roomCode)
    }
    else if(drawCheck(newBoard)){
      setIsDraw(true)
      socket.emit('gameTied',roomCode)
    }
  };

  socket.on('playerMoved',({index})=>{
    let newBoard;
    if(playerWon || opponentWon || isDraw){
      newBoard = Array(9).fill("null");
      setIsDraw(false)
    setPlayerWon(false)
    setOpponentWon(false)
    }
    else{
      newBoard = [...board]
    }
    newBoard[index] = playerChoice === 'x' ? 'o' : 'x';
    setBoard(newBoard)
    setIsPlayerTurn(true)
  })

  socket.on('opponentWon',()=>{
    setOpponentWon(true)
  })

  socket.on('gameTied', ()=>{
    setIsDraw(true)
  })
  useEffect(()=>{
    if(isPlayerHost){
        setIsPlayerTurn(true)
        setPlayerChoice('x');
    }
    else{
        setPlayerChoice('o')
    }
  },[])


  const drawCheck = (newBoard : string[]) => {
    const EmptySpots = newBoard
      .map((val, idx) => (val === "null" ? idx : null))
      .filter((val) => val !== null);

    if (EmptySpots.length === 0) {
      return true;
    }
    return false;
  };

  const winCheck = (newBoard : string[]) => {
    const winLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winLines.length; i++) {
      const [a, b, c] = winLines[i];
      if (
        newBoard[a] !== "null" &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        return true;
      }
    }
    return false;
  };

  const resetGame = ()=>{
    setBoard(Array(9).fill("null"));
    setIsDraw(false)
    setPlayerWon(false)
    setOpponentWon(false)

    if(isPlayerHost){
      setIsPlayerTurn(true)
  }
  else{
      setIsPlayerTurn(false)
  }
  }
  return (
    <>
      <Card className= "w-80 mx-auto border-none shadow-none dark pb-5">
        <CardHeader>
          <CardTitle className="text-center"></CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center gap-10">
          <Button
            className="w-40"
            variant={`${isPlayerTurn ? "default":"outline"}`}
            
          ><p className="mr-3">Your turn</p>
            {playerChoice === "o" ? <Circle className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
          <Button
            className="w-40"
            variant={`${isPlayerTurn ? "outline":"default"}`}
            
          ><p className="mr-3">Opponent turn</p>
            {playerChoice === "x" ? <Circle className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </CardContent>
      </Card>
      <Board board={board} handleGame={handleGame}></Board>
      <div className="text-white pt-5 text-center">
        {opponentWon && `Opponent won!!`}
        {playerWon && `You won!!`}
        {isDraw && `Game tied`}
        {(playerWon || opponentWon || isDraw) && (
          <Button variant="link" className="text-lg inline text-white" onClick={resetGame}>
            Restart ?
          </Button>
        )}
      </div>
    </>
  );
};

export default OnlineGame;
