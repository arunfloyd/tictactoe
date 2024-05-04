import { useRef, useState, useEffect } from "react";
import "./TicTac.css";
import circle from "../assets/circle.png";
import cross from "../assets/cross.png";


const TicTac = () => {
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const winRef = useRef();
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [mode, setMode] = useState("human"); // New state for game mode

  useEffect(() => {
    if (mode === "computer") {
      winRef.current.innerHTML = `You Vs Computer `
    }
  }, [mode]);
  useEffect(() => {
   checkWin()
  }, [count]);
  useEffect(() => {
    if (count % 2 !== 0 && !lock && mode === "computer") {
      computerMove();
    }
  }, [count, lock, mode]);

  const toggle = (e, num) => {
    if (lock) {
      return;
    }
    if (count % 2 === 0 || mode === "human") {
      if (mode === "human") {
        if (count % 2 === 0) {
          e.target.innerHTML = `<img src='${cross}'>`;
          setBoard((prevBoard) => {
            const newBoard = [...prevBoard];
            newBoard[num] = "x";
            return newBoard;
          });
        } else {
          e.target.innerHTML = `<img src='${circle}'>`;
          setBoard((prevBoard) => {
            const newBoard = [...prevBoard];
            newBoard[num] = "o";
            return newBoard;
          });
        }
        setCount(count + 1);
        checkWin();
      } else if (mode === "computer" && count % 2 === 0) {
        e.target.innerHTML = `<img src='${cross}'>`;
        setBoard((prevBoard) => {
          const newBoard = [...prevBoard];
          newBoard[num] = "x";
          return newBoard;
        });
        setCount(count + 1);
        checkWin();
      }
    }
  };

  const checkWin = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
        won(board[a]);
        return;
      }
    }
    // Check for a draw
    if (!board.includes("")) {
      won("draw");
      return;
    }
  };

  const won = (winner) => {
    setLock(true);
    if (winner === "x") {
      winRef.current.innerHTML = `X Wins`;
    } else if (winner === "o") {
      winRef.current.innerHTML = `O Wins`;
    } else if (winner === "draw") {
      winRef.current.innerHTML = `Draw`;
    }
  };

  const computerMove = () => {
    let bestScore = -Infinity;
    let move;

    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        const newBoard = [...board];
        newBoard[i] = "o";
        const score = evaluate(newBoard);
        newBoard[i] = "";

        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }

    if (move !== undefined) {
      document.getElementById(`box${move}`).innerHTML = `<img src='${circle}'>`;
      setBoard((prevBoard) => {
        const newBoard = [...prevBoard];
        newBoard[move] = "o";
        return newBoard;
      });
      setCount(count + 1);
      checkWin();
    }
  };

  const evaluate = (board) => {
    const lines = [
      [0, 1, 2], // Top row
      [3, 4, 5], // Middle row
      [6, 7, 8], // Bottom row
      [0, 3, 6], // Left column
      [1, 4, 7], // Middle column
      [2, 5, 8], // Right column
      [0, 4, 8], // Diagonal top-left to bottom-right
      [2, 4, 6], // Diagonal top-right to bottom-left
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
        if (board[a] === "x") {
          return -10; // Player 'x' wins
        } else if (board[a] === "o") {
          return 10; // Player 'o' wins
        }
      }
    }

    // Check for a draw
    if (board.includes("")) {
      return 0; // Game is still ongoing
    }

    return 0; // Fallback, should not be reached
  };

  const reset = () => {
    window.location.reload();
  };

  return (
    <div className="continer">
      <h1 className="title" ref={winRef}>
        Tic Tac Toe
      </h1>
      {mode === "human" && (
        <div className="board">
          <div className="row1">
            <div
              className="boxes"
              onClick={(e) => {
                toggle(e, 0);
              }}
              id="box0"
            ></div>

            <div
              className="boxes"
              onClick={(e) => {
                toggle(e, 1);
              }}
              id="box1"
            ></div>
            <div
              className="boxes"
              onClick={(e) => {
                toggle(e, 2);
              }}
              id="box2"
            ></div>
          </div>
          <div className="row2">
            <div
              className="boxes"
              onClick={(e) => {
                toggle(e, 3);
              }}
              id="box3"
            ></div>
            <div
              className="boxes"
              onClick={(e) => {
                toggle(e, 4);
              }}
              id="box4"
            ></div>
            <div
              className="boxes"
              onClick={(e) => {
                toggle(e, 5);
              }}
              id="box5"
            ></div>
          </div>
          <div className="row3">
            <div
              className="boxes"
              onClick={(e) => {
                toggle(e, 6);
              }}
              id="box6"
            ></div>
            <div
              className="boxes"
              onClick={(e) => {
                toggle(e, 7);
              }}
              id="box7"
            ></div>
            <div
              className="boxes"
              onClick={(e) => {
                toggle(e, 8);
              }}
              id="box8"
            ></div>
          </div>
        </div>
      )}
      {mode === "computer" && (
        <div className="board">
          <div className="row1">
            <div
              className="boxes"
              onClick={(e) => {
                toggle(e, 0);
              }}
              id="box0"
            ></div>

            <div
              className="boxes"
              onClick={(e) => {
                toggle(e, 1);
              }}
              id="box1"
            ></div>
            <div
              className="boxes"
              onClick={(e) => {
                toggle(e, 2);
              }}
              id="box2"
            ></div>
          </div>
          <div className="row2">
            <div
              className="boxes"
              onClick={(e) => {
                toggle(e, 3);
              }}
              id="box3"
            ></div>
            <div
              className="boxes"
              onClick={(e) => {
                toggle(e, 4);
              }}
              id="box4"
            ></div>
            <div
              className="boxes"
              onClick={(e) => {
                toggle(e, 5);
              }}
              id="box5"
            ></div>
          </div>
          <div className="row3">
            <div
              className="boxes"
              onClick={(e) => {
                toggle(e, 6);
              }}
              id="box6"
            ></div>
            <div
              className="boxes"
              onClick={(e) => {
                toggle(e, 7);
              }}
              id="box7"
            ></div>
            <div
              className="boxes"
              onClick={(e) => {
                toggle(e, 8);
              }}
              id="box8"
            ></div>
          </div>
        </div>
      )}
      <button className="reset" onClick={() => reset()}>
        Reset
      </button>
      <button className="human" onClick={() => setMode("human")}>
        🧑 Play with Human
      </button>
      <button className="computer" onClick={() => setMode("computer")}>
        🤖 Play with Computer
      </button>
    </div>
  );
};

export default TicTac;
