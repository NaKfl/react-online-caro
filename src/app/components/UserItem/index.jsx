import React from 'react';
import { Avatar, Button, Tooltip } from 'antd';
import {
  StyledUserItem,
  StyledUserStatus,
  StyledTextStatus,
  StyledAvatar,
  StyledBadge,
  StyledName,
  StyledPart,
} from './styles';
import { USER_STATUS } from 'utils/constants';

const UserItem = props => {
  const { user, ...rest } = props;
  const { status, name, avatar } = user;
  const { color, title } = USER_STATUS[status];

  return (
    <StyledUserItem {...rest}>
      <StyledPart>
        <StyledAvatar>
          <Avatar size={40} src={avatar} />
          <StyledBadge color={color} />
        </StyledAvatar>
        <StyledUserStatus>
          <StyledName>{name}</StyledName>
          <StyledTextStatus color={color}>{title}</StyledTextStatus>
        </StyledUserStatus>
      </StyledPart>
      {status === USER_STATUS.ONLINE.value && (
        <Tooltip placement="left" title="Invite">
          <Button shape="circle">+</Button>
        </Tooltip>
      )}
    </StyledUserItem>
  );
};

export default UserItem;
