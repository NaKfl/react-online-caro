import { memo } from 'react';
import { StyledBoard } from '../styles';
import { Row, Col } from 'app/components/Grid';
import Square from '../Square';
const Board = memo(({ size, boardLayout, squarePerRow }) => {
  const renderRow = i => {
    return (
      <Row key={i}>
        {boardLayout[0].map((square, index) => (
          <Square size={size} key={index} />
        ))}
      </Row>
    );
  };
  const renderRows = () => {
    return <>{boardLayout[0].map((_, i) => renderRow(i))}</>;
  };
  return <StyledBoard>{renderRows()}</StyledBoard>;
});
export default Board;
