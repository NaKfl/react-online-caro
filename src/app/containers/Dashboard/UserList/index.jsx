import React, { memo } from 'react';
import { Drawer } from 'antd';
import UserItem from 'app/components/UserItem';
import { StyledUserList } from './styles';
export const UserList = props => {
  const { visible, onClose, userList } = props;
  return (
    <StyledUserList>
      <p> USERS ONLINE</p>
      {userList.map(item => {
        return <UserItem key={item.id} user={item}></UserItem>;
      })}
    </StyledUserList>
  );
};
export default memo(UserList);
