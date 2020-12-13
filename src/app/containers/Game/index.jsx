import { StyledLayoutGame } from './styles';
import { memo, useState } from 'react';
import { useWindowSize } from 'hooks/useWindowSize';
import Board from './Board';

export const Game = memo(() => {
  const { height } = useWindowSize();
  const size = height / 22;
  const ArrayBoard = useState(Array(16).fill(''));
  return (
    <StyledLayoutGame>
      <Board boardLayout={ArrayBoard} size={size} squarePerRow={15} />
    </StyledLayoutGame>
  );
});

export default Game;
