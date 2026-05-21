import { useState } from "react";
import "./app.css";

export default function App() {
  const [image, setImage] = useState(null);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState("X");

  function handleImageUpload(e) {
    const file = e.target.files[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
  }

  function playSquare(index) {
    if (board[index]) return;

    const newBoard = [...board];
    newBoard[index] = turn;

    setBoard(newBoard);

    setTurn(turn === "X" ? "O" : "X");
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setTurn("X");
  }

  return (
    <div className="page">
      <h1>Forehead Tic-Tac-Toe</h1>

      <p>Upload a forehead photo and play tic-tac-toe on it.</p>

      <input type="file" accept="image/*" onChange={handleImageUpload} />

      <div className="game-area">
        {image && <img src={image} className="forehead-photo" />}

        {image && (
          <div className="board">
            {board.map((square, index) => (
              <button key={index} onClick={() => playSquare(index)}>
                {square}
              </button>
            ))}
          </div>
        )}
      </div>

      {image && (
        <>
          <p className="turn">Turn: {turn}</p>

          <button className="reset-btn" onClick={resetGame}>
            Reset Game
          </button>
        </>
      )}
    </div>
  );
}