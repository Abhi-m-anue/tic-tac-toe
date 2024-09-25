import { X, Circle } from "lucide-react";

interface Props {
  board: string[];
  handleGame : (index : number) => void;
}

const Board = ({ board, handleGame }: Props) => {
  return (
    <>
      <div className="grid grid-rows-3 grid-cols-3 w-60 mx-auto text-white">
        {board.map((cell: string,index : number) => {
          return (
            <div className="flex items-center justify-center border h-20" onClick={()=>{handleGame(index)}} key={index}>
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
      </div>
    </>
  );
};

export default Board;
