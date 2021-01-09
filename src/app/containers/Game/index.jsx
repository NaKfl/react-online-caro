import {
  StyledSideRight,
  StyledSideLeft,
  StyledSideOuterRight,
  StyledLayoutGame,
  StyledRow,
  StyledRoomHeader,
} from './styles';
import { memo } from 'react';
import { sliceKey, reducer } from './slice';
import { useInjectReducer } from 'utils/reduxInjectors';
import { useHooks } from './hook';
import Board from './Board';
import { ChatRoom } from 'app/containers/Chat';
import { useParams } from 'react-router-dom';
import PlayerInfoSideBar from 'app/components/PlayerInfoSideBar';
import { UserList } from '../Dashboard/UserList';

export const Game = memo(props => {
  useInjectReducer({ key: sliceKey, reducer });
  const { id: roomId } = useParams();
  const { selector, handlers } = useHooks(props);
  const { boards, roomPanel, status, onlineUserList } = selector;
  console.log('roomPanel', roomPanel);
  const { handleLeaveRoom } = handlers;
  return (
    <StyledRow>
      <StyledRoomHeader>{`${roomPanel?.name} (ID: ${roomPanel.joinId})`}</StyledRoomHeader>
      <StyledLayoutGame>
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
          <div className="list-user">
            <UserList
              title="Viewing Users"
              userList={roomPanel?.viewingList}
            ></UserList>
          </div>
          <ChatRoom roomId={roomId} height="50%" />
        </StyledSideRight>
        <StyledSideOuterRight>
          <div className="list-user">
            <UserList
              title="Online Users"
              isInRoom={true}
              userList={onlineUserList}
            ></UserList>
          </div>
        </StyledSideOuterRight>
      </StyledLayoutGame>
    </StyledRow>
  );
});

export default Game;
