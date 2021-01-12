import { memo } from 'react';
// import { StyledNotifiWinner } from '../styles';
import Square from '../Square';
const Board = memo(
  ({ size, boardCurrent, status, handleClick, disabled, ...rest }) => {
    return (
      <div className="square-box" {...rest}>
        <div className="square-content">
          {boardCurrent.map((square, i) => (
            <Square disabled key={i} onClick={() => handleClick(i)}>
              {square}
            </Square>
          ))}
        </div>
      </div>
    );
  },
);
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
