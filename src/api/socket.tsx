import { io, Socket } from "socket.io-client";

interface ServerToClientEvents {
    cantJoinRoom : (data : string)=> void;
    joinedRoom : (name : string)=> void;
    newRoomCreated : (data : {gameId : string}) => void;
    beginGame : (name : string)=> void;
    playerMoved : (data : { index : number}) => void;
    opponentWon : () => void;
    gameTied : ()=> void;
    opponentLeft : ()=> void;
    chat : (msg : string,roomCode:string) => void;
    // withAck: (d: string, callback: (e: number) => void) => void;
  }
  
  interface ClientToServerEvents {
    joinRoom: ({ roomId, name }: { roomId: string; name: string }) => void;
    createNewRoom : (name :string)=> void;
    playerMoved : (index : number,roomCode:string) => void;
    playerWon :(roomCode : string)=> void;
    gameTied : (roomCode : string)=> void;
    chat : (msg : string,roomCode:string) => void;
  }
  

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io('https://tic-tac-toe-iewq.onrender.com');

export default socket