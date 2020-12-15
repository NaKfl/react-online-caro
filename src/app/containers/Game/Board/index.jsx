import { memo } from 'react';
import { StyledBoard } from '../styles';
import { Row } from 'app/components/Grid';
import Square from '../Square';
const Board = memo(({ size, boardCurrent, squarePerRow, handleClick }) => {
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
          boardCurrent.slice(i * squarePerRow, i * squarePerRow + squarePerRow),
          i,
        )}
      </Row>
    ));
  };
  return <StyledBoard>{renderRows()}</StyledBoard>;
});
export default Board;
