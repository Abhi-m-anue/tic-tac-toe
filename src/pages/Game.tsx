import Board from "@/components/Board";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Circle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Game = () => {
  const [board, setBoard] = useState<string[]>(Array(9).fill("null"));
  const [playerChoice, setPlayerChoice] = useState<string>("x");
  const [isGameWon, setIsGameWon] = useState<boolean>(false);
  const [isDraw, setIsDraw] = useState<boolean>(false);
  const [winner,setWinner] = useState<string>("")

  const handleGame = (index: number) => {
    // if game is already won/tied reset the board and start a new game
    if (isGameWon || isDraw) {
      setIsGameWon((prev) => prev&&false);
      setIsDraw((prev) => prev&&false);
      setBoard(() => {
        const newBoard = Array(9).fill("null");
        return newBoard;
      });
    }

    // clicked on an already marked cell
    if (board[index] !== "null" || isGameWon || isDraw) {
      return;
    }

    // By default, changes to a state variable is not instantly reflected (react re-renders only after the function
    // call is finished) and hence, after the user-move our comPlay function will use the board which was in
    // previous state, and not updated board. to fix this use

    // This is a functional form of setState, which ensures that this updated board will be used for further setState calls
    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      newBoard[index] = playerChoice;
      return newBoard;
    });

    // AI play
    comPlay();
  };

  const comPlay = () => {
    // All operations should be done inside the functional form of setState to ensure that updated board is used to
    // find the empty spots

    setBoard((prevBoard) => {
      // check if user won game in previous move
      if (winCheck(prevBoard)) {
        setIsGameWon(true);
        return prevBoard;
      }
      // creates a list of indexes where AI can create a move
      const emptySpots = prevBoard
        .map((val, idx) => (val === "null" ? idx : null))
        .filter((val) => val !== null);

      // check if previous move made the game draw
      if (emptySpots.length === 0) {
        setIsDraw(true);
        return prevBoard;
      }

      // choose a random available index
      const randomIndex =
        emptySpots[Math.floor(Math.random() * emptySpots.length)];

      const newBoard = [...prevBoard];
      newBoard[randomIndex] = playerChoice === "x" ? "o" : "x";

      // check if AI won in current move
      if (winCheck(newBoard)) {
        setIsGameWon(true);
      }
      const newEmptySpots = prevBoard
        .map((val, idx) => (val === "null" ? idx : null))
        .filter((val) => val !== null);

      // check if current move made the game draw
      if (newEmptySpots.length === 0) {
        setIsDraw(true);
      }

      return newBoard;
    });
  };

  const winCheck = (newBoard: string[]) => {
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
        if(newBoard[a] === playerChoice){
            setWinner("User")
        }
        else{
            setWinner("Computer")
        }
        return true;
      }
    }
    return false;
  };

  const resetGame = () => {
    setIsGameWon(false);
    setIsDraw(false);
    setBoard(Array(9).fill("null"));
  };

  return (
    <>
      <Card className="w-80 mx-auto border-none shadow-none dark">
        <CardHeader>
          <CardTitle className="text-center">Choose your icon</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center gap-10">
          <Button
            variant={`${playerChoice === "x" ? "default" : "outline"}`}
            size="icon"
            onClick={() => setPlayerChoice("x")}
          >
            <X className="h-4 w-4" />
          </Button>
          <Button
            variant={`${playerChoice === "x" ? "outline" : "default"}`}
            size="icon"
            onClick={() => setPlayerChoice("o")}
          >
            <Circle className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      <Board board={board} handleGame={handleGame} />

      <div className="text-white pt-5 text-center">
      {isGameWon && `winner is ${winner}`}
      {(isGameWon || isDraw) && <div className="text-2xl" onClick={resetGame}>Restart game</div>}
      </div>
    </>
  );
};

export default Game;
