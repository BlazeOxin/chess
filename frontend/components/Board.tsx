import * as React from 'react';
import './Board.scss'

export interface BoardProps {

}
export default function Board({ }: BoardProps) {
  return (
    <>
      <div className="board">
        {[...Array(8).keys()].map((row) => (
          <div key={row} className="board-row">
            {[...Array(8).keys()].map((col) => (
              <div className={"chess-block "+((row+col)%2 == 0 ? "black" : "white")} key={col}></div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
