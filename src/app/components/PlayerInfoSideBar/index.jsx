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
import { Link } from 'react-router-dom';

const PlayerInfoSideBar = ({
  roomPanel,
  handleLeaveRoom,
  handleJoinOutBoard,
  disabledRules,
}) => {
  return (
    <StyledPlayerInfoSideBar {...roomPanel}>
      <Link to="/" onClick={handleLeaveRoom}>
        <GameButton title="Out Room" icon={<ArrowLeftOutlined />} />
      </Link>

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
        <PlayerCard user={roomPanel?.firstPlayer} />
        <StyledScore>{roomPanel?.firstPlayer?.point ?? 0}</StyledScore>
        <StyledDivider />
        <StyledScore>{roomPanel?.secondPlayer?.point ?? 0}</StyledScore>
        <PlayerCard user={roomPanel?.secondPlayer} isHost />
      </StyledPanel>
    </StyledPlayerInfoSideBar>
  );
};

export default PlayerInfoSideBar;
