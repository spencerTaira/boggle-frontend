import "./Board.css";
import Tile from "./Tile";

function Board({ gameboard }: { gameboard: Array<Array<String>> }) {
  console.log("What is gameboard in Board", gameboard);
  return (
    <div className="Board">
      {
        gameboard.map((row) =>{
          return(
          <div className="Board-row">
            {row.map((tile) => <Tile letter={tile} />)}
          </div>
          )
        })
      }
    </div>
  );
}

export default Board;
