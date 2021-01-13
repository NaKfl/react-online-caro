import PlayerInfoSideBar from 'app/components/PlayerInfoSideBar';
import { ChatRoom } from 'app/containers/Chat';
import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useInjectReducer } from 'utils/reduxInjectors';
import Board from './Board';
import { useHooks } from './hook';
import { reducer, sliceKey } from './slice';
import {
  StyledBoardOverlay,
  StyledLayoutGame,
  StyledRoomFooter,
  StyledRoomHeader,
  StyledRow,
  StyledSideLeft,
  StyledSideRight,
} from './styles';
import moment from 'moment';

export const History = memo(props => {
  useInjectReducer({ key: sliceKey, reducer });
  const { id: roomId } = useParams();
  const { selector, handlers } = useHooks(props);
  const {
    boards,
    roomPanel,
    status,
    gameInfo,
    currentIndex,
    messages,
  } = selector;

  const {
    handleLeaveRoom,
    handleShowInfo,
    handleConfirmOutRoom,
    handleForwardStep,
    handleBackwardStep,
  } = handlers;

  return (
    <StyledRow>
      <StyledRoomHeader>{`Room: ${gameInfo?.room?.name} ${
        gameInfo?.joinId ? `(ID: ${gameInfo.joinId})` : ''
      }`}</StyledRoomHeader>
      <StyledLayoutGame>
        <StyledSideLeft>
          <PlayerInfoSideBar
            adminMode
            gameInfo={gameInfo}
            handleShowInfo={handleShowInfo}
            handleLeaveRoom={handleLeaveRoom}
            handleForwardStep={handleForwardStep}
            handleBackwardStep={handleBackwardStep}
            handleConfirmOutRoom={handleConfirmOutRoom}
            roomPanel={roomPanel}
            disabledRules={{
              forward: currentIndex === boards.length - 1,
              backward: currentIndex === 0,
            }}
          />
        </StyledSideLeft>
        <StyledBoardOverlay>
          <Board
            disabled
            status={status}
            boardCurrent={boards[currentIndex] ?? []}
            squarePerRow={16}
            handleClick={handlers.handleClickSquare}
          />
        </StyledBoardOverlay>

        <StyledSideRight>
          <ChatRoom
            initMessages={messages}
            roomId={roomId}
            height="100%"
            isHideInput
          />
        </StyledSideRight>
      </StyledLayoutGame>
      <StyledRoomFooter>
        <span>{`Started at: ${moment(gameInfo?.createdAt).format(
          'YYYY-MM-DD HH:mm:ss',
        )}`}</span>
        <span>{` ${
          gameInfo?.completeAt
            ? `Completed at: ${moment(gameInfo.completeAt).format(
                'YYYY-MM-DD HH:mm:ss',
              )}`
            : ''
        }`}</span>
        <span>{`${
          gameInfo?.userWin
            ? `Winner: ${
                gameInfo.userWin === gameInfo.infoPlayerFirst.id
                  ? `${gameInfo.infoPlayerFirst.name}`
                  : `${gameInfo.infoPlayerSecond.name}`
              }`
            : `${gameInfo?.completeAt ? 'Draw' : 'Undone'}`
        }`}</span>
      </StyledRoomFooter>
    </StyledRow>
  );
});

export default History;
