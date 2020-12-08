import React from 'react';
import CommonLayout from 'app/containers/AppLayout/CommonLayout';
import UserList from './UserList/index';
import { StyledButton } from './styles';
import { useHooks } from './hooks';

const Dashboard = props => {
  const { states, selectors, table, handlers } = useHooks(props);
  const { toggleUserList } = states;
  const { handleOnClose, handleToggle } = handlers;
  return (
    <CommonLayout>
      <UserList visible={toggleUserList} onClose={handleOnClose}></UserList>
      <StyledButton
        type="primary"
        onClick={() => {
          handleToggle();
        }}
      >
        Open
      </StyledButton>
    </CommonLayout>
  );
};

export default Dashboard;
