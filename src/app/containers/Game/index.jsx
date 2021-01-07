import { StyledSideRight, StyledSideLeft } from './styles';
import { memo } from 'react';
import { sliceKey, reducer } from './slice';
import { useInjectReducer } from 'utils/reduxInjectors';
import { useHooks } from './hook';
import Board from './Board';
import { ChatRoom } from 'app/containers/Chat';
import { useParams } from 'react-router-dom';
import PlayerInfoSideBar from 'app/components/PlayerInfoSideBar';

export const Game = memo(props => {
  useInjectReducer({ key: sliceKey, reducer });
  const { id: roomId } = useParams();
  const { selector, handlers } = useHooks(props);
  const { boards, roomPanel, status } = selector;
  const { handleLeaveRoom } = handlers;
  return (
    <>
      <StyledSideLeft>
        <PlayerInfoSideBar
          handleLeaveRoom={handleLeaveRoom}
          roomPanel={roomPanel}
        />
      </StyledSideLeft>
      <Board
        status={status}
        boardCurrent={boards[boards.length - 1]}
        squarePerRow={16}
        handleClick={handlers.handleClickSquare}
      />
      <StyledSideRight>
        <ChatRoom roomId={roomId} height="100%" />
      </StyledSideRight>
    </>
  );
});

export default Game;
