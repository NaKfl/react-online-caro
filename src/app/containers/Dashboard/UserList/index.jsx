import React, { memo } from 'react';
import { Drawer } from 'antd';
import UserItem from 'app/components/UserItem';
import PropTypes from 'prop-types';

export type UserItemType = {
  visible: Boolean,
  onClose: PropTypes.func,
};

export const UserList = (props: UserItemType) => {
  const { visible, onClose } = props;
  return (
    <>
      <Drawer
        title="Basic Drawer"
        placement="right"
        // closable={false}
        onClose={onClose}
        visible={visible}
      >
        <UserItem></UserItem>
        <UserItem></UserItem>
        <UserItem></UserItem>
        <UserItem></UserItem>
      </Drawer>
    </>
  );
};
export default memo(UserList);
