import React, { createContext } from "react";

interface myContextType{
    isPlayerHost : boolean;
    setIsPlayerHost : React.Dispatch<React.SetStateAction<boolean>>;
    roomCode : string;
    setRoomCode : React.Dispatch<React.SetStateAction<string>>;
}

const initialState = {
    isPlayerHost : false,
    setIsPlayerHost : ()=>{},
    roomCode : '',
    setRoomCode : ()=>{}
}

const GameContext = createContext<myContextType>(initialState)

export default GameContext