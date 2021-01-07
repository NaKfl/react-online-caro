import { memo } from 'react';
import { StyledBoard, StyledNotifiWinner } from '../styles';
import { Row } from 'app/components/Grid';
import Square from '../Square';
import Button from 'app/components/Button';
const Board = memo(
  ({ size, boardCurrent, status, squarePerRow, handleClick }) => {
    const renderRow = (rows, i) => {
      return (
        <>
          {rows.map((value, index) => (
            <Square
              size={size}
              key={index}
              onClick={() => handleClick(i * squarePerRow + index)}
            >
              {value}
            </Square>
          ))}
        </>
      );
    };
    const renderRows = () => {
      const arr = Array(squarePerRow).fill(null);
      return arr.map((_, i) => (
        <Row key={i}>
          {renderRow(
            boardCurrent.slice(
              i * squarePerRow,
              i * squarePerRow + squarePerRow,
            ),
            i,
          )}
        </Row>
      ));
    };
    return (
      <StyledBoard status={status}>
        {status !== null && (
          <StyledNotifiWinner>
            {status}
            <Button size="large" type="primary" style={{ margin: '0px 10px' }}>
              Play again
            </Button>
          </StyledNotifiWinner>
        )}
        {renderRows()}
      </StyledBoard>
    );
  },
);
export default Board;
