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
  ArrowLeftOutlined,
  UserSwitchOutlined,
  SmileOutlined,
  MehOutlined,
} from '@ant-design/icons';
import circle from 'assets/circle.svg';
import cross from 'assets/cross.svg';

const PlayerInfoSideBar = ({
  roomPanel,
  handleLeaveRoom,
  handleJoinOutBoard,
  handleShowInfo,
  disabledRules,
  handleConfirmOutRoom,
  me,
  gameInfo,
}) => {
  return (
    <StyledPlayerInfoSideBar {...roomPanel}>
      <GameButton
        onClick={
          me?.status === 'PLAYING' ? handleConfirmOutRoom : handleLeaveRoom
        }
        title="Out Room"
        icon={<ArrowLeftOutlined />}
      />

      <GameButton
        disabled={disabledRules.joinOut}
        onClick={handleJoinOutBoard}
        title="Join/Out Board"
        icon={<UserSwitchOutlined />}
      />

      <GameButton
        disabled={disabledRules.sur}
        title="Surrender"
        icon={<MehOutlined />}
      />
      <GameButton
        disabled={disabledRules.draw}
        title="Request Draw"
        icon={<SmileOutlined />}
      />

      <StyledPanel>
        <PlayerCard
          onClick={() => handleShowInfo(roomPanel?.firstPlayer)}
          user={roomPanel?.firstPlayer}
          myTurn={gameInfo?.turn === 0}
        />
        <StyledScore>
          <img className="cross" src={cross} alt="x-icon" />
        </StyledScore>
        <StyledDivider />
        <StyledScore>
          <img className="circle" src={circle} alt="o-icon" />
        </StyledScore>
        <PlayerCard
          onClick={() => handleShowInfo(roomPanel?.secondPlayer)}
          user={roomPanel?.secondPlayer}
          myTurn={gameInfo?.turn === 1}
          isHost
        />
      </StyledPanel>
    </StyledPlayerInfoSideBar>
  );
};

export default PlayerInfoSideBar;
