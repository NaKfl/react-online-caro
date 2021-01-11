import { StyledLayout } from 'app/components/Layout/LayoutColumn';
import { memo } from 'react';
import { useInjectSaga, useInjectReducer } from 'utils/reduxInjectors';
import { sliceKey, reducer } from './slice';
import Title from 'app/components/Title';
import saga from './saga';
import Table from './Table';
import useHooks from './hooks';

export const GameList = memo(() => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { selectors } = useHooks();
  const { gameList } = selectors;
  return (
    <>
      <StyledLayout>
        <Title level={4}>List of Game</Title>
        <Table dataSource={gameList} />
      </StyledLayout>
    </>
  );
});
export default GameList;
