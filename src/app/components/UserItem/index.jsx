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
  const { user, handleClickInvite, handleShowInfor, isInRoom, ...rest } = props;
  const { status, name, avatar } = user;
  const { color, title } = USER_STATUS[status];

  return (
    <StyledUserItem {...rest}>
      <StyledPart onClick={handleShowInfor}>
        <StyledAvatar>
          <Avatar size={40} src={avatar} />
          <StyledBadge color={color} />
        </StyledAvatar>
        <StyledUserStatus>
          <StyledName>{name}</StyledName>
          <StyledTextStatus color={color}>{title}</StyledTextStatus>
        </StyledUserStatus>
      </StyledPart>
      {status === USER_STATUS.ONLINE.value && isInRoom && (
        <Tooltip placement="left" title="Invite">
          <Button
            shape="circle"
            onClick={() => {
              handleClickInvite(user);
            }}
          >
            +
          </Button>
        </Tooltip>
      )}
    </StyledUserItem>
  );
};

export default UserItem;
