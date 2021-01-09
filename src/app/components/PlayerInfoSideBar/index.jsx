import React from 'react';
import {
  StyledPlayerInfoSideBar,
  StyledDivider,
  StyledScore,
  StyledPanel,
  StyledBackButton,
  StyledRoomInfoGroup,
  StyledRoomName,
} from './styles';
import PlayerCard from 'app/components/PlayerCard';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const PlayerInfoSideBar = ({ roomPanel, handleLeaveRoom }) => {
  return (
    <StyledPlayerInfoSideBar {...roomPanel}>
      <StyledRoomInfoGroup>
        <Link to="/" onClick={handleLeaveRoom}>
          <StyledBackButton icon={<ArrowLeftOutlined />}></StyledBackButton>
        </Link>
        <StyledRoomName>{`Room ${roomPanel?.name}`}</StyledRoomName>
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
