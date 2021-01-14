import React, { memo } from 'react';
import UserItem from 'app/components/UserItem';
import Panel from 'app/components/Panel';
import useHooks from './hooks';
import { getUser as getUserFromStorage } from 'utils/localStorageUtils';

export const UserList = props => {
  const user = getUserFromStorage();
  const { userList, isInRoom, title } = props;
  const { handlers } = useHooks(props);
  const { showInfoUser, handleClickInvite } = handlers;
  let formattedUserList = [];
  const me = userList?.find(item => item?.id === user?.id);
  const others = userList?.filter(item => item?.id !== user?.id) ?? [];
  if (me) formattedUserList = [{ ...me, isMe: true }, ...others];
  else formattedUserList = [...others];

  return (
    <Panel title={title}>
      {formattedUserList.map(item => {
        return (
          <UserItem
            isInRoom={isInRoom}
            handleClickInvite={handleClickInvite}
            key={item?.id}
            user={item}
            handleShowInfor={() => showInfoUser(item)}
          />
        );
      })}
    </Panel>
  );
};
export default memo(UserList);
