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

const PlayerInfoSideBar = ({ host, guest, room, ...rest }) => {
  return (
    <StyledPlayerInfoSideBar {...rest}>
      <StyledRoomInfoGroup>
        <StyledBackButton icon={<ArrowLeftOutlined />}></StyledBackButton>
        <StyledRoomName>{room}</StyledRoomName>
      </StyledRoomInfoGroup>
      <StyledPanel>
        <PlayerCard user={guest} />
        <StyledScore>{guest?.score ?? 0}</StyledScore>
        <StyledDivider />
        <StyledScore>{guest?.score ?? 0}</StyledScore>
        <PlayerCard user={host} />
      </StyledPanel>
    </StyledPlayerInfoSideBar>
  );
};

export default PlayerInfoSideBar;
