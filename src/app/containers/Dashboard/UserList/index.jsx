import React, { memo } from 'react';
import UserItem from 'app/components/UserItem';
import Panel from 'app/components/Panel';
import useHooks from './hooks';

export const UserList = props => {
  const { userList, isInRoom, title } = props;
  const { handlers } = useHooks(props);
  const { showInfoUser, handleClickInvite } = handlers;
  return (
    <Panel title={title}>
      {userList &&
        userList.map(item => {
          return (
            <UserItem
              isInRoom={isInRoom}
              handleClickInvite={handleClickInvite}
              key={item.id}
              user={item}
              handleShowInfor={() => showInfoUser(item)}
            />
          );
        })}
    </Panel>
  );
};
export default memo(UserList);
