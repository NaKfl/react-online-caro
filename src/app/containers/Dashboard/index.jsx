import React, { memo } from 'react';
import UserList from './UserList';
import Chat from './Chat';
import { StyledButton, StyledDashboard } from './styles';
import { useHooks } from './hooks';

export const Dashboard = props => {
  const { states, selectors, handlers } = useHooks(props);
  const { userListOnline } = selectors;
  const { toggleUserList } = states;
  const { handleOnClose, handleToggle } = handlers;

  return (
    <StyledDashboard>
      <Chat />

      <UserList
        userList={userListOnline}
        visible={toggleUserList}
        onClose={handleOnClose}
      ></UserList>
      <StyledButton
        type="primary"
        onClick={() => {
          handleToggle();
        }}
      >
        Open
      </StyledButton>
    </StyledDashboard>
  );
};

export default memo(Dashboard);
