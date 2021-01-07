import React from 'react';
import { StyledPlayerCard, StyledName, StyledLevel } from './styles';
import AvatarSpin from 'app/components/AvatarSpin';

const PlayerCard = ({ user, isHost, ...rest }) => {
  return (
    <StyledPlayerCard {...rest}>
      <StyledName>{user?.name ?? 'Waiting for others . . .'}</StyledName>
      <AvatarSpin
        isLoading={!!user?.name}
        size={126}
        src={
          user?.avatar ??
          'https://media2.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif'
        }
      />
      <StyledLevel>{isHost ? 'Host' : 'Guest'}</StyledLevel>
    </StyledPlayerCard>
  );
};

export default PlayerCard;
