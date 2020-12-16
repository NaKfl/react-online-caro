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

const PlayerInfoSideBar = ({ host, guest, room, ...rest }) => {
  return (
    <StyledPlayerInfoSideBar {...rest}>
      <StyledRoomInfoGroup>
        <Link to="/">
          <StyledBackButton icon={<ArrowLeftOutlined />}></StyledBackButton>
        </Link>
        <StyledRoomName>{`Room ${room?.name}`}</StyledRoomName>
      </StyledRoomInfoGroup>
      <StyledPanel>
        <PlayerCard user={guest} />
        <StyledScore>{guest?.score ?? 0}</StyledScore>
        <StyledDivider />
        <StyledScore>{guest?.score ?? 0}</StyledScore>
        <PlayerCard user={host} isHost />
      </StyledPanel>
    </StyledPlayerInfoSideBar>
  );
};

export default PlayerInfoSideBar;
