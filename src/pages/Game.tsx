import Board from "@/components/Board";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Circle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Game = () => {
  const [board, setBoard] = useState<string[]>(Array(9).fill("null"));
  const [gameStarted,setGameStarted] = useState<boolean>(false);
  const [playerChoice, setPlayerChoice] = useState<string>("x");
  const [userPlayed, setUserPlayed] = useState<boolean>(false);
  const [comPlayed, setComPlayed] = useState<boolean>(false);
  const [isGameWon, setIsGameWon] = useState<boolean>(false);
  const [isDraw, setIsDraw] = useState<boolean>(false);
  const [winner, setWinner] = useState<string>("");

  const handleGame = (index: number) => {
    if(!gameStarted){
      setGameStarted(true);
    }
    // if game is already won/tied reset the board and start a new game
    if (isGameWon || isDraw) {
      setIsGameWon(false);
      setIsDraw(false);
      setBoard(() => {
        const newBoard = Array(9).fill("null");
        return newBoard;
      });
      setGameStarted(false)
    }

    // clicked on an already marked cell
    if (board[index] !== "null" || isGameWon || isDraw) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = playerChoice;
    setBoard(newBoard);

    setUserPlayed(true);
  };

  const comPlay = () => {
    // find empty indexes where computer can play
    const emptySpots = board
      .map((val, idx) => (val === "null" ? idx : null))
      .filter((val) => val !== null);
    // choose a random such index
    const randomIndex =
      emptySpots[Math.floor(Math.random() * emptySpots.length)];

    const newBoard = [...board];
    newBoard[randomIndex] = playerChoice === "x" ? "o" : "x";
    setBoard(newBoard);

    setComPlayed(true);
  };

  const drawCheck = () => {
    const EmptySpots = board
      .map((val, idx) => (val === "null" ? idx : null))
      .filter((val) => val !== null);

    if (EmptySpots.length === 0) {
      return true;
    }
    return false;
  };

  const winCheck = () => {
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
        board[a] !== "null" &&
        board[a] === board[b] &&
        board[a] === board[c]
      ) {
        if (board[a] === playerChoice) {
          setWinner("User");
        } else {
          setWinner("Computer");
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
    setGameStarted(false)
  };

  useEffect(() => {
    // Triggers when user completes his move
    if (userPlayed) {
      if (winCheck()) {
        setIsGameWon(true);
      } else if (drawCheck()) {
        setIsDraw(true);
      } else {
        comPlay();
      }

      setUserPlayed(false);
    }
    // Triggers when computer completes its move
    if (comPlayed) {
      if (winCheck()) {
        setIsGameWon(true);
      } else if (drawCheck()) {
        setIsDraw(true);
      }
      setComPlayed(false);
    }
  }, [userPlayed, comPlayed]);

  return (
    <>
      <Card className={gameStarted ? "w-80 mx-auto border-none shadow-none dark pb-5 invisible":"w-80 mx-auto border-none shadow-none dark pb-5"}>
        <CardHeader>
          <CardTitle className="text-center"></CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center gap-10">
          <Button
            className="w-36"
            variant={`${playerChoice === "x" ? "default" : "outline"}`}
            size="icon"
            onClick={() => setPlayerChoice("x")}
          >
            <X className="h-4 w-4" />
          </Button>
          <Button
            className="w-36"
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
        {isGameWon && `${winner} won!!`}
        {isDraw && `Game tied`}
        {(isGameWon || isDraw) && (
          <Button variant="link" className="text-lg inline text-white" onClick={resetGame}>
            Restart ?
          </Button>
        )}
      </div>
    </>
  );
};

export default Game;
