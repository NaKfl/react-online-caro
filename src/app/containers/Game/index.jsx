import {
  StyledLayoutGame,
  StyledRow,
  StyledSideRight,
  StyledSideLeft,
} from './styles';
import { memo, useState } from 'react';
import { useWindowSize } from 'hooks/useWindowSize';
import { sliceKey, reducer } from './slice';
import { useInjectReducer } from 'utils/reduxInjectors';
import { useHooks } from './hook';
import Board from './Board';
import Row from 'app/components/Row';
import { ChatRoom } from 'app/containers/Chat';
import { useParams } from 'react-router-dom';
import PlayerInfoSideBar from 'app/components/PlayerInfoSideBar';

export const Game = memo(props => {
  useInjectReducer({ key: sliceKey, reducer });
  const { id: roomId } = useParams();
  const { selector, handlers } = useHooks(props);
  const { boards } = selector;
  const { height, width } = useWindowSize();
  return (
    <StyledLayoutGame>
      <StyledRow justify="space-between" align="middle">
        <StyledSideLeft>
          <PlayerInfoSideBar />
        </StyledSideLeft>
        <Board
          boardCurrent={boards[boards.length - 1]}
          size={{ height, width }}
          squarePerRow={16}
          handleClick={handlers.handleClickSquare}
        />
        <StyledSideRight>
          <ChatRoom roomId={roomId} height="100%" />
        </StyledSideRight>
      </StyledRow>
    </StyledLayoutGame>
  );
});

export default Game;
