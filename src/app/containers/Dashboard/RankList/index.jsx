import React, { memo } from 'react';
import UserRankItem from 'app/components/UserRankItem';
import Panel from 'app/components/Panel';
import useHooks from './hooks';
import { getUser as getUserFromStorage } from 'utils/localStorageUtils';

export const RankList = props => {
  const user = getUserFromStorage();
  const { rankList } = props;
  const { handlers } = useHooks(props);
  const { showInfoUser } = handlers;
  const formattedRankList =
    rankList?.length > 0
      ? rankList.map(item => {
          if (item?.id === user.id) {
            return { ...item, isMe: true };
          }
          return item;
        })
      : [];

  return (
    <Panel title="Top Ranks">
      {formattedRankList.map((item, index) => {
        return (
          <UserRankItem
            no={index + 1}
            isShowPoint
            key={item?.id}
            user={item}
            handleShowInfor={() => showInfoUser(item)}
          />
        );
      })}
    </Panel>
  );
};
export default memo(RankList);
