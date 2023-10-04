import "./Board.css";
import Tile from "./Tile";

function Board({ gameboard }: { gameboard: Array<Array<String>> }) {
  return (
    <div className="Board">
      {gameboard.map((row, i) => {
        return (
          <div className="Board-row" key={i}>
            {row.map((tile, j) => (
              <Tile letter={tile} key={`${i}${j}`} />
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default Board;
