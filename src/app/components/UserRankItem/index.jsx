import React from 'react';
import { Avatar } from 'antd';
import {
  StyledUserItem,
  StyledUserStatus,
  StyledAvatar,
  StyledName,
  StyledPart,
} from './styles';

const UserItem = props => {
  const { user, handleClickInvite, handleShowInfor, no, ...rest } = props;
  const { name, avatar, point } = user;

  return (
    <StyledUserItem {...rest}>
      <StyledPart className="name-and-status" onClick={handleShowInfor}>
        <StyledAvatar>
          <span>{no}</span>
          <Avatar size={40} src={avatar} />
        </StyledAvatar>
        <StyledUserStatus>
          <StyledName>{name}</StyledName>
        </StyledUserStatus>
      </StyledPart>
      <StyledPart className="invite-button">{`${point} points`}</StyledPart>
    </StyledUserItem>
  );
};

export default UserItem;
