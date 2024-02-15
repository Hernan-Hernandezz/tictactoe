export const WinnerModal = ({winner, resetGame}) => {
  if (winner === null) return null;
  //borra el tablero cuando se muestra el modal
  window.localStorage.setItem("board", JSON.stringify(Array(9).fill(null)));

  return (
    <section className="winner">
      <div className="text">
        <h2>{winner === false ? "empate" : `gano:`}</h2>
        <header className="win">{winner}</header>
        <footer>
          <button onClick={resetGame}>empezar de nuevo</button>
        </footer>
      </div>
    </section>
  );
};
