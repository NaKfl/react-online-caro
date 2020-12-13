import React, { memo } from 'react';
import { Drawer } from 'antd';
import UserItem from 'app/components/UserItem';

export const UserList = props => {
  const { visible, onClose, userList } = props;
  return (
    <>
      <Drawer
        title="Basic Drawer"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        {userList.map(item => {
          return <UserItem key={item.id} user={item}></UserItem>;
        })}
      </Drawer>
    </>
  );
};
export default memo(UserList);
