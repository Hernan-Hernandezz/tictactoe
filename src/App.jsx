import {useState, useEffect} from "react";
import {Square} from "./components/Square";
import {Turn} from "./components/Turn";
import {TURN, WINNER_COMBOS} from "./constants";
import {checkWinnerFrom} from "./logic/board";
import {WinnerModal} from "./components/WinnerModal";
import {
  getGameStorage,
  removeGameStorage,
  setGameStorage,
} from "./logic/storage";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURN.X);
  const [winner, setWinner] = useState(null);
  const [gameCount, setGameCount] = useState({X: 0, O: 0});
  useEffect(() => {
    const getStorage = (key) => window.localStorage.getItem(key);
    const setStorage = (key, value) => window.localStorage.setItem(key, value);
    if (getGameStorage()) {
      setBoard(JSON.parse(getStorage("board")));
      setTurn(getStorage("turn"));
      setGameCount(JSON.parse(getStorage("gameCount")));
    }
  }, []);
  checkWinnerFrom(board);

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square != null);
  };
  //actualiza todo los datos del juego
  const updateBoard = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    const newWinner = checkWinnerFrom(newBoard);
    const newGameCount = {...gameCount};
    if (newWinner) {
      setWinner(newWinner);
      newWinner === "x" ? (newGameCount.X += 1) : (newGameCount.O += 1);
      setGameCount(newGameCount);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
    const newTurn = turn === TURN.X ? TURN.O : TURN.X;
    setTurn(newTurn);
    setGameStorage(newBoard, newTurn, newGameCount);
  };

  //borra solo el tablero
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURN.X);
    setWinner(null);
  };

  //borra todo el juego y localStorage
  const resetGameCount = () => {
    setGameCount({X: 0, O: 0});
    setBoard(Array(9).fill(null));
    removeGameStorage();
    setTurn(TURN.X);
  };

  return (
    <main className="board">
      <h1>TicTacToe</h1>
      <section className="gameWin">
        <h3>partidas ganadas</h3>
        <p>
          X:{gameCount.X} - O:{gameCount.O}
        </p>
        <p></p>
      </section>
      <button onClick={resetGame}>empezar de nuevo</button>
      <button onClick={resetGameCount}>borrar partidas</button>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>
      <Turn turn={turn} TURN={TURN} />
      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  );
}

export default App;
