import * as React from "react";
import kingW from "../../assets/chess-pieces/king-white.png";
import kingB from "../../assets/chess-pieces/king-black.png";
import queenW from "../../assets/chess-pieces/queen-white.png";
import queenB from "../../assets/chess-pieces/queen-black.png";
import bishopW from "../../assets/chess-pieces/bishop-white.png";
import bishopB from "../../assets/chess-pieces/bishop-black.png";
import knightW from "../../assets/chess-pieces/knight-white.png";
import knightB from "../../assets/chess-pieces/knight-black.png";
import rookW from "../../assets/chess-pieces/rook-white.png";
import rookB from "../../assets/chess-pieces/rook-black.png";
import pawnW from "../../assets/chess-pieces/pawn-white.png";
import pawnB from "../../assets/chess-pieces/pawn-black.png";
import "./Board.scss";

export interface BoardProps {}
export default function Board({}: BoardProps) {
  return (
    <>
      <div className="board">
        {[...Array(8).keys()].map((row) => (
          <div key={row} className="board-row">
            {[...Array(8).keys()].map((col) => (
              <div
                className={
                  "chess-block " + ((row + col) % 2 == 0 ? "white" : "black")
                }
                key={col}
              >
                {row === 7 && col === 4 ? <img src={kingW} alt="" /> : <></>}
                {row === 0 && col === 4 ? <img src={kingB} alt="" /> : <></>}
                {row === 7 && col === 3 ? <img src={queenW} alt="" /> : <></>}
                {row === 0 && col === 3 ? <img src={queenB} alt="" /> : <></>}
                {row === 7 && (col === 2 || col === 5) ? (
                  <img src={bishopW} alt="" />
                ) : (
                  <></>
                )}
                {row === 0 && (col === 2 || col === 5) ? (
                  <img src={bishopB} alt="" />
                ) : (
                  <></>
                )}
                {row === 7 && (col === 1 || col === 6) ? (
                  <img src={knightW} alt="" />
                ) : (
                  <></>
                )}
                {row === 0 && (col === 1 || col === 6) ? (
                  <img src={knightB} alt="" />
                ) : (
                  <></>
                )}
                {row === 7 && (col === 0 || col === 7) ? (
                  <img src={rookW} alt="" />
                ) : (
                  <></>
                )}
                {row === 0 && (col === 0 || col === 7) ? (
                  <img src={rookB} alt="" />
                ) : (
                  <></>
                )}
                {row === 6 ? <img src={pawnW} alt="" /> : <></>}
                {row === 1 ? <img src={pawnB} alt="" /> : <></>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
