import { io, Socket } from "socket.io-client";

interface ServerToClientEvents {
    cantJoinRoom : (data : string)=> void;
    joinedRoom : ()=> void;
    newRoomCreated : (data : {gameId : string}) => void;
    beginGame : ()=> void;
    playerMoved : (data : { index : number}) => void;
    opponentWon : () => void;
    gameTied : ()=> void
    // noArg: () => void;
    // basicEmit: (a: number, b: string, c: Buffer) => void;
    // withAck: (d: string, callback: (e: number) => void) => void;
  }
  
  interface ClientToServerEvents {
    joinRoom: ({ roomId, name }: { roomId: string; name: string }) => void;
    createNewRoom : ()=> void;
    playerMoved : (index : number,roomCode:string) => void;
    playerWon :(roomCode : string)=> void;
    gameTied : (roomCode : string)=> void;
    // hello: () => void;
  }
  

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io('http://localhost:3000');

export default socket