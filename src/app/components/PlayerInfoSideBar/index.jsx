import React from 'react';
import {
  StyledPlayerInfoSideBar,
  StyledDivider,
  StyledScore,
  StyledPanel,
  StyledButton,
  StyledRoomInfoGroup,
  StyledRoomName,
} from './styles';
import PlayerCard from 'app/components/PlayerCard';
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
}) => {
  return (
    <StyledPlayerInfoSideBar {...roomPanel}>
      <Link to="/" onClick={handleLeaveRoom}>
        <StyledRoomInfoGroup>
          <StyledButton icon={<ArrowLeftOutlined />} />
          <StyledRoomName>Out room</StyledRoomName>
        </StyledRoomInfoGroup>
      </Link>
      <StyledRoomInfoGroup>
        <StyledButton icon={<MehOutlined />} />
        <StyledRoomName>Surrender</StyledRoomName>
      </StyledRoomInfoGroup>
      <StyledRoomInfoGroup>
        <StyledButton icon={<SmileOutlined />} />
        <StyledRoomName>Request Draw</StyledRoomName>
      </StyledRoomInfoGroup>
      <StyledRoomInfoGroup onClick={handleJoinOutBoard}>
        <StyledButton icon={<UserSwitchOutlined />} />
        <StyledRoomName>Join/Out Board</StyledRoomName>
      </StyledRoomInfoGroup>
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
