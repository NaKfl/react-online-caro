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
  const { status, name, avatar, isMe } = user;

  return (
    <StyledUserItem {...rest}>
      <StyledPart className="name-and-status" onClick={handleShowInfor}>
        <StyledAvatar>
          <Avatar size={40} src={avatar} />
          <StyledBadge color={USER_STATUS[status]?.color} />
        </StyledAvatar>
        <StyledUserStatus>
          <StyledName isMe={isMe}>{`${name} ${
            isMe ? '(You)' : ''
          }`}</StyledName>
          <StyledTextStatus color={USER_STATUS[status]?.color}>
            {USER_STATUS[status]?.title}
          </StyledTextStatus>
        </StyledUserStatus>
      </StyledPart>
      <StyledPart className="invite-button">
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
      </StyledPart>
    </StyledUserItem>
  );
};

export default UserItem;
