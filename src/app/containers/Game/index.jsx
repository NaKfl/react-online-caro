import { StyledLayoutGame, StyledGameInfo } from './styles';
import { memo, useState } from 'react';
import { useWindowSize } from 'hooks/useWindowSize';
import { sliceKey, reducer } from './slice';
import { useInjectSaga, useInjectReducer } from 'utils/reduxInjectors';
import { useHooks } from './hook';
import Board from './Board';
export const Game = memo(() => {
  useInjectReducer({ key: sliceKey, reducer });
  const { selector } = useHooks();
  const { squarePerRow, boardHistory } = selector;
  const boardCurrent = boardHistory[boardHistory.length - 1];
  const { height, width } = useWindowSize();
  return (
    <StyledLayoutGame className="hihi">
      <Board
        boardCurrent={boardCurrent}
        size={{ height, width }}
        squarePerRow={16}
      />
    </StyledLayoutGame>
  );
});

export default Game;
