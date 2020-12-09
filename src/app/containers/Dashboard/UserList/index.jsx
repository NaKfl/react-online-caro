import React, { memo } from 'react';
import { Drawer } from 'antd';
import UserItem from 'app/components/UserItem';
import PropTypes from 'prop-types';

export type UserListType = {
  userList: Array<PropTypes.object>,
  visible: Boolean,
  onClose: PropTypes.func,
};

export const UserList = (props: UserListType) => {
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
        {userList.map((item, index) => {
          return <UserItem key={index} user={item}></UserItem>;
        })}
      </Drawer>
    </>
  );
};
export default memo(UserList);
