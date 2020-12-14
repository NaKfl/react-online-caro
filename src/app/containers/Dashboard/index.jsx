import React, { memo } from 'react';
import UserList from './UserList';
import { StyledButton, StyledDashboard } from './styles';
import { useHooks } from './hooks';
import RoomList from './RoomList';
export const Dashboard = props => {
  const { states, selectors, handlers } = useHooks(props);
  const { userListOnline } = selectors;
  const { toggleUserList } = states;
  const { handleOnClose, handleToggle } = handlers;
  return (
    <StyledDashboard>
      <div>
        <div>
          <RoomList />
        </div>
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
      </div>
    </StyledDashboard>
  );
};

export default memo(Dashboard);
