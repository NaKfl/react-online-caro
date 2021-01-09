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

const PlayerInfoSideBar = ({ roomPanel, handleLeaveRoom }) => {
  return (
    <StyledPlayerInfoSideBar {...roomPanel}>
      <StyledRoomInfoGroup>
        <Link to="/" onClick={handleLeaveRoom}>
          <StyledButton icon={<ArrowLeftOutlined />}></StyledButton>
        </Link>
        <StyledRoomName>Out room</StyledRoomName>
      </StyledRoomInfoGroup>
      <StyledRoomInfoGroup>
        <StyledButton icon={<MehOutlined />}></StyledButton>
        <StyledRoomName>Surrender</StyledRoomName>
      </StyledRoomInfoGroup>
      <StyledRoomInfoGroup>
        <StyledButton icon={<SmileOutlined />}></StyledButton>
        <StyledRoomName>Request Draw</StyledRoomName>
      </StyledRoomInfoGroup>
      <StyledRoomInfoGroup>
        <StyledButton icon={<UserSwitchOutlined />}></StyledButton>
        <StyledRoomName>Join Game</StyledRoomName>
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
