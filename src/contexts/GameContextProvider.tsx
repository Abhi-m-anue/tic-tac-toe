import { useState } from "react";
import GameContext from "../contexts/GameContext";

interface Props {
  children: React.ReactNode;
}
const GameContextProvider = (props: Props) => {
  const [isPlayerHost, setIsPlayerHost] = useState<boolean>(false);
  const [roomCode,setRoomCode] = useState<string>('')
  const [opponentName, setOpponentName] = useState<string>('')
  return (
    <GameContext.Provider value={{ isPlayerHost, setIsPlayerHost, roomCode, setRoomCode, opponentName, setOpponentName}}>
      {props.children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
