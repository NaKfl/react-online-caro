import React, { memo } from 'react';
import UserItem from 'app/components/UserItem';
import { StyledUserList, StyledTitle, StyledScrollList } from './styles';
import useHooks from './hooks';

export const UserList = props => {
  const { userList, isInRoom } = props;
  const { handlers } = useHooks(props);
  const { showInfoUser, handleClickInvite } = handlers;
  return (
    <StyledUserList>
      <StyledTitle>Online Users</StyledTitle>
      <StyledScrollList>
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
      </StyledScrollList>
    </StyledUserList>
  );
};
export default memo(UserList);
