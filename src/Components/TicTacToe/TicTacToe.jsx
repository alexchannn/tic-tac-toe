import React, { useState } from 'react';
import './TicTacToe.css';
import circleIcon from '../Assets/circleIcon.png';
import crossIcon from '../Assets/crossIcon.png';

const WINNING_PATTERNS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

const TicTacToe = () => {
  const [data, setData] = useState(Array(9).fill(""));
  const [moveCount, setMoveCount] = useState(0);
  const [isBoardLocked, setIsBoardLocked] = useState(false);
  const [winner, setWinner] = useState(null);

  const checkWinner = (nextData) => {
    for (let pattern of WINNING_PATTERNS) {
      const [a, b, c] = pattern;
      if (
        nextData[a] &&
        nextData[a] === nextData[b] &&
        nextData[a] === nextData[c]
      ) {
        return nextData[a];
      }
    }
    return null;
  };

  const handleBoxClick = (index) => {
    if (isBoardLocked || data[index] !== "" || winner) return;
    const newData = [...data];
    newData[index] = moveCount % 2 === 0 ? "circle" : "cross";
    setData(newData);
    setMoveCount(moveCount + 1);

    const currentWinner = checkWinner(newData);
    if (currentWinner) {
      setWinner(currentWinner);
      setIsBoardLocked(true);
    }
    else if (moveCount === 8) {
      setIsBoardLocked(true);
    }
  };

  const handleRestart = () => {
    setData(Array(9).fill(""));
    setMoveCount(0);
    setIsBoardLocked(false);
    setWinner(null);
  };

  const renderBox = (index) => (
    <div
      className="box"
      onClick={() => handleBoxClick(index)}
    >
      {data[index] === "circle" && <img src={circleIcon} alt="circle" />}
      {data[index] === "cross" && <img src={crossIcon} alt="cross" />}
    </div>
  );

  const isDraw = !winner && isBoardLocked && moveCount === 9;

  return (
    <div className='container'>
      <h1 className='title'>
        {winner ? (
          <>
            Congratulations: {winner === 'circle' ? <span>⭕ Wins</span> : <span>❌ Wins</span>}
          </>
        ) : isDraw ? (
          <>
            <span>Draw!</span>
          </>
        ) : (
          <>
            Tic Tac Toe Game In <span>React</span>
          </>
        )}
      </h1>
      <div className='board'>
        <div className='row-1'>
          {renderBox(0)}
          {renderBox(1)}
          {renderBox(2)}
        </div>
        <div className='row-2'>
          {renderBox(3)}
          {renderBox(4)}
          {renderBox(5)}
        </div>
        <div className='row-3'>
          {renderBox(6)}
          {renderBox(7)}
          {renderBox(8)}
        </div>
      </div>
      <button className='restart-button' onClick={handleRestart}>Restart Game</button>
    </div>
  );
};

export default TicTacToe;