import React, { memo } from 'react';
import UserItem from 'app/components/UserItem';
import { StyledUserList, StyledTitle, StyledScrollList } from './styles';
import useHooks from './hooks';

export const UserList = props => {
  const { userList } = props;
  const { handlers } = useHooks();
  const { showInfoUser } = handlers;
  return (
    <StyledUserList>
      <StyledTitle>Online Users</StyledTitle>
      <StyledScrollList>
        {userList &&
          userList.map(item => {
            return (
              <UserItem
                key={item.id}
                user={item}
                onClick={() => showInfoUser(item)}
              />
            );
          })}
      </StyledScrollList>
    </StyledUserList>
  );
};
export default memo(UserList);
