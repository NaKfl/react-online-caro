import React from 'react';
import {
  StyledPlayerInfoSideBar,
  StyledDivider,
  StyledScore,
  StyledPanel,
} from './styles';
import PlayerCard from 'app/components/PlayerCard';
import GameButton from 'app/components/GameButton';
import {
  UserSwitchOutlined,
  SmileOutlined,
  MehOutlined,
  SelectOutlined,
  DoubleRightOutlined,
  DoubleLeftOutlined,
} from '@ant-design/icons';
import circle from 'assets/circle.svg';
import cross from 'assets/cross.svg';
import { useHistory } from 'react-router-dom';

const PlayerInfoSideBar = ({
  adminMode,
  roomPanel,
  handleLeaveRoom,
  handleJoinOutBoard,
  handleShowInfo,
  disabledRules,
  handleConfirmOutRoom,
  handleConfirmRequestDraw,
  handleConfirmSurrender,
  handleForwardStep,
  handleBackwardStep,
  me,
  gameInfo,
}) => {
  const history = useHistory();
  return (
    <StyledPlayerInfoSideBar {...roomPanel}>
      <div>
        <GameButton
          onClick={
            adminMode
              ? () => history.goBack()
              : me?.status === 'PLAYING'
              ? handleConfirmOutRoom
              : handleLeaveRoom
          }
          title={adminMode ? 'Go Back' : 'Out Room'}
          icon={<SelectOutlined />}
        />

        {(!adminMode && [
          <GameButton
            disabled={disabledRules.joinOut}
            onClick={handleJoinOutBoard}
            title="Join/Out Board"
            icon={<UserSwitchOutlined />}
          />,

          <GameButton
            onClick={handleConfirmSurrender}
            disabled={disabledRules.sur}
            title="Surrender"
            icon={<MehOutlined />}
          />,
          <GameButton
            onClick={handleConfirmRequestDraw}
            disabled={disabledRules.draw}
            title="Request Draw"
            icon={<SmileOutlined />}
          />,
        ]) || [
          <GameButton
            disabled={disabledRules.backward}
            onClick={handleBackwardStep}
            title="Previous Step"
            icon={<DoubleLeftOutlined />}
          />,

          <GameButton
            disabled={disabledRules.forward}
            onClick={handleForwardStep}
            title="Next Step"
            icon={<DoubleRightOutlined />}
          />,
        ]}
      </div>

      <StyledPanel>
        <PlayerCard
          adminMode={adminMode}
          onClick={() =>
            handleShowInfo(roomPanel?.firstPlayer || gameInfo?.infoPlayerFirst)
          }
          user={roomPanel?.firstPlayer || gameInfo?.infoPlayerFirst}
          myTurn={gameInfo?.turn === 1}
        />
        <StyledScore>
          <img className="cross" src={cross} alt="x-icon" />
        </StyledScore>
        <StyledDivider />
        <StyledScore>
          <img className="circle" src={circle} alt="o-icon" />
        </StyledScore>
        <PlayerCard
          adminMode={adminMode}
          onClick={() =>
            handleShowInfo(
              roomPanel?.secondPlayer || gameInfo?.infoPlayerSecond,
            )
          }
          user={roomPanel?.secondPlayer || gameInfo?.infoPlayerSecond}
          myTurn={gameInfo?.turn === 0}
          isHost
        />
      </StyledPanel>
    </StyledPlayerInfoSideBar>
  );
};

export default PlayerInfoSideBar;
