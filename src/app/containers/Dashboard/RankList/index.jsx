import React, { memo } from 'react';
import UserRankItem from 'app/components/UserRankItem';
import Panel from 'app/components/Panel';
import useHooks from './hooks';

export const RankList = props => {
  const { rankList } = props;
  console.log('rankList', rankList);
  const { handlers } = useHooks(props);
  const { showInfoUser } = handlers;
  return (
    <Panel title="Top Ranks">
      {rankList &&
        rankList.map((item, index) => {
          return (
            <UserRankItem
              no={index + 1}
              isShowPoint
              key={item.id}
              user={item}
              handleShowInfor={() => showInfoUser(item)}
            />
          );
        })}
    </Panel>
  );
};
export default memo(RankList);
