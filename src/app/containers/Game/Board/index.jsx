import { memo } from 'react';
import { StyledBoard } from '../styles';
import { Row } from 'app/components/Grid';
import Square from '../Square';
const Board = memo(({ size, boardCurrent, squarePerRow, handleClick }) => {
  const renderRow = i => {
    return (
      <Row key={i}>
        {boardCurrent.map((_, index) => (
          <Square
            size={size}
            key={index}
            onClick={() => handleClick(squarePerRow * i + index)}
          />
        ))}
      </Row>
    );
  };
  const renderRows = () => {
    return <>{boardCurrent.map((_, i) => renderRow(i))}</>;
  };
  return <StyledBoard>{renderRows()}</StyledBoard>;
});
export default Board;
