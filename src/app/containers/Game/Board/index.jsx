import { memo } from 'react';
import { StyledNotifiWinner } from '../styles';
import Square from '../Square';
import Button from 'app/components/Button';
const Board = memo(({ size, boardCurrent, status, handleClick }) => {
  return (
    <div className="square-box">
      <div className="square-content">
        {boardCurrent.map((square, i) => (
          <Square key={i} onClick={() => handleClick(i)}>
            {square}
          </Square>
        ))}
      </div>
    </div>
  );
});
// const NotifyWinner = ({ status }) => {
//   return (
//     <StyledNotifiWinner>
//       {status}
//       <Button size="large" type="primary" style={{ margin: '0px 10px' }}>
//         Play again
//       </Button>
//     </StyledNotifiWinner>
//   );
// };
export default Board;
