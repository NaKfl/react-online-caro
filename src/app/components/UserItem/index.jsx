import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Typography, Badge } from 'antd';
const { Text } = Typography;

export type UserItemType = {
  user: PropTypes.object,
};

const UserItem = (props: UserItemType) => {
  const { user } = props;

  return (
    <div className="user-item">
      <Badge status="success" />
      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      <Text>{user.name}</Text>
    </div>
  );
};

export default UserItem;
