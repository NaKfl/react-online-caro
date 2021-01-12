import { memo } from 'react';
import { NotifyWinner } from './NotifyWinner';
import Square from '../Square';

const Board = memo(
  ({
    size,
    boardCurrent,
    status,
    resetGame,
    handleClick,
    winArray,
    ...rest
  }) => {
    return (
      <div className="square-box" {...rest}>
        <div className="square-content">
          {boardCurrent.map((square, i) => (
            <Square
              key={i}
              onClick={() => handleClick(i)}
              className={`${winArray.indexOf(i) !== -1 ? 'bold' : ''}`}
            >
              {square}
            </Square>
          ))}
          {status && <NotifyWinner status={status} resetGame={resetGame} />}
        </div>
      </div>
    );
  },
);
export default Board;
