import { X, Circle } from "lucide-react";

interface Props {
  board: string[];
  handleGame: (index: number) => void;
}

const Board = ({ board, handleGame }: Props) => {
  return (
    <>
      <div className="grid grid-rows-3 grid-cols-3 w-80 mx-auto text-white hover:cursor-pointer">
        {/* {board.map((cell: string,index : number) => {
          return (
            <div className="flex items-center justify-center border h-28" onClick={()=>{handleGame(index)}} key={index}>
              {cell === "null" ? (
                ""
              ) : cell === "x" ? (
                <X strokeWidth={3} size={70} />
              ) : (
                <Circle strokeWidth={3} size={60} />
              )}
            </div>
          );
        })} 
        below method of creating board is used to make the board border styling easy
         */}
        <div
          className="flex items-center justify-center border-r border-b h-28"
          onClick={() => {
            handleGame(0);
          }}
        >
          {board[0] === "null" ? (
            ""
          ) : board[0] === "x" ? (
            <X strokeWidth={3} size = {90} />
          ) : (
            <Circle strokeWidth={3} size = {70} />
          )}
        </div>
        <div
          className="flex items-center justify-center h-28 border-b border-r"
          onClick={() => {
            handleGame(1);
          }}
        >
          {board[1] === "null" ? (
            ""
          ) : board[1] === "x" ? (
            <X strokeWidth={3} size = {90} />
          ) : (
            <Circle strokeWidth={3} size = {70} />
          )}
        </div>
        <div
          className="flex items-center justify-center border-b h-28"
          onClick={() => {
            handleGame(2);
          }}
        >
          {board[2] === "null" ? (
            ""
          ) : board[2] === "x" ? (
            <X strokeWidth={3} size = {90} />
          ) : (
            <Circle strokeWidth={3} size = {70} />
          )}
        </div>
        <div
          className="flex items-center justify-center border-b border-r h-28"
          onClick={() => {
            handleGame(3);
          }}
        >
          {board[3] === "null" ? (
            ""
          ) : board[3] === "x" ? (
            <X strokeWidth={3} size = {90} />
          ) : (
            <Circle strokeWidth={3} size = {70} />
          )}
        </div>
        <div
          className="flex items-center justify-center border-b border-r h-28"
          onClick={() => {
            handleGame(4);
          }}
        >
          {board[4] === "null" ? (
            ""
          ) : board[4] === "x" ? (
            <X strokeWidth={3} size = {90} />
          ) : (
            <Circle strokeWidth={3} size = {70} />
          )}
        </div>
        <div
          className="flex items-center justify-center border-b h-28"
          onClick={() => {
            handleGame(5);
          }}
        >
          {board[5] === "null" ? (
            ""
          ) : board[5] === "x" ? (
            <X strokeWidth={3} size = {90} />
          ) : (
            <Circle strokeWidth={3} size = {70} />
          )}
        </div>
        <div
          className="flex items-center justify-center border-r h-28"
          onClick={() => {
            handleGame(6);
          }}
        >
          {board[6] === "null" ? (
            ""
          ) : board[6] === "x" ? (
            <X strokeWidth={3} size = {90} />
          ) : (
            <Circle strokeWidth={3} size = {70} />
          )}
        </div>
        <div
          className="flex items-center justify-center border-r h-28"
          onClick={() => {
            handleGame(7);
          }}
        >
          {board[7] === "null" ? (
            ""
          ) : board[7] === "x" ? (
            <X strokeWidth={3} size = {90} />
          ) : (
            <Circle strokeWidth={3} size = {70} />
          )}
        </div>
        <div
          className="flex items-center justify-center h-28"
          onClick={() => {
            handleGame(8);
          }}
        >
          {board[8] === "null" ? (
            ""
          ) : board[8] === "x" ? (
            <X strokeWidth={3} size = {90} />
          ) : (
            <Circle strokeWidth={3} size = {70} />
          )}
        </div>
      </div>
    </>
  );
};

export default Board;
