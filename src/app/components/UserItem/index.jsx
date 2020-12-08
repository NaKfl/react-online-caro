import React from 'react';
import { Avatar, Typography, Badge } from 'antd';
const { Text } = Typography;

export type UserItemType = {
  userName: String,
  isOnline: Boolean,
};

const UserItem = (props: UserItemType) => {
  const { userName, isOnline } = props;

  return (
    <div className="user-item">
      <Badge status="success" />
      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      <Text>Lz bảo</Text>
    </div>
  );
};

export default UserItem;
