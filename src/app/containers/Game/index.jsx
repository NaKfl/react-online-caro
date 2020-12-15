import { StyledLayoutGame } from './styles';
import { memo } from 'react';
import { useWindowSize } from 'hooks/useWindowSize';
import { sliceKey, reducer } from './slice';
import { useInjectReducer } from 'utils/reduxInjectors';
import { useHooks } from './hook';
import Board from './Board';
import { ChatRoom } from 'app/containers/Chat';
import { useParams } from 'react-router-dom';

export const Game = memo(props => {
  useInjectReducer({ key: sliceKey, reducer });
  const { id: roomId } = useParams();
  const { selector, handlers } = useHooks(props);
  const { boards } = selector;
  const { height, width } = useWindowSize();
  return (
    <StyledLayoutGame className="hihi">
      <Board
        boardCurrent={boards[boards.length - 1]}
        size={{ height, width }}
        squarePerRow={16}
        handleClick={handlers.handleClickSquare}
      />
      <ChatRoom roomId={roomId} />
    </StyledLayoutGame>
  );
});

export default Game;
