import {
  StyledSideRight,
  StyledSideLeft,
  StyledSideOuterRight,
  StyledLayoutGame,
  StyledRow,
  StyledRoomHeader,
  StyledBoardOverlay,
  StyledCountdown,
} from './styles';
import { memo } from 'react';
import { sliceKey, reducer } from './slice';
import { useInjectReducer } from 'utils/reduxInjectors';
import { useHooks } from './hook';
import Board from './Board';
import { ChatRoom } from 'app/containers/Chat';
import { useParams } from 'react-router-dom';
import PlayerInfoSideBar from 'app/components/PlayerInfoSideBar';
import GameButton from 'app/components/GameButton';
import { UserList } from '../Dashboard/UserList';
import { FireFilled, LoadingOutlined } from '@ant-design/icons';
import Countdown from 'react-countdown';

export const Game = memo(props => {
  useInjectReducer({ key: sliceKey, reducer });
  const { id: roomId } = useParams();
  const { selector, handlers } = useHooks(props);
  const {
    boards,
    roomPanel,
    status,
    onlineUserList,
    toggleReady,
    isUserInViewingList,
  } = selector;
  const { handleLeaveRoom, handleJoinOutBoard, handleToggleReady } = handlers;
  const isPlaying = roomPanel?.status === 'PLAYING';
  return (
    <StyledRow>
      <StyledRoomHeader>{`${roomPanel?.name} (ID: ${roomPanel?.joinId})`}</StyledRoomHeader>
      <StyledLayoutGame>
        <StyledSideLeft>
          <PlayerInfoSideBar
            handleJoinOutBoard={handleJoinOutBoard}
            handleLeaveRoom={handleLeaveRoom}
            roomPanel={roomPanel}
            disabledRules={{
              joinOut: toggleReady,
              sur: !isPlaying,
              draw: !isPlaying,
            }}
          />
        </StyledSideLeft>
        <StyledBoardOverlay>
          {!isPlaying && (
            <div className="overlay">
              <GameButton
                disabled={isUserInViewingList}
                icon={toggleReady ? <LoadingOutlined /> : <FireFilled />}
                title={toggleReady ? 'Waiting for ready' : 'Ready'}
                buttonColor={toggleReady ? '#808080' : '#ED553B'}
                titleColor={toggleReady ? '#ED553B' : '#808080'}
                onClick={handleToggleReady}
              />
            </div>
          )}
          {isPlaying && (
            <Countdown
              date={Date.now() + 5000}
              renderer={({ hours, minutes, seconds, completed }) => {
                if (completed) {
                  return (
                    <Board
                      status={status}
                      boardCurrent={boards[boards.length - 1]}
                      squarePerRow={16}
                      handleClick={handlers.handleClickSquare}
                    />
                  );
                } else {
                  return (
                    <StyledCountdown>
                      <h3 className="text">The game will start in</h3>
                      <h2 className="number">{`${seconds}s`}</h2>
                    </StyledCountdown>
                  );
                }
              }}
            ></Countdown>
          )}
        </StyledBoardOverlay>

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
