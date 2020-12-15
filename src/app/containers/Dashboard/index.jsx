import React, { memo } from 'react';
import UserList from './UserList';
import Chat from 'app/containers/Chat';
import { StyledDashboard } from './styles';
import { useHooks } from './hooks';
import RoomList from './RoomList';
import { Col, Row } from 'antd';
export const Dashboard = props => {
  const { states, selectors, handlers } = useHooks(props);
  const { userListOnline } = selectors;
  const { toggleUserList } = states;
  const { handleOnClose, handleToggle } = handlers;

  return (
    <StyledDashboard>
      <Row justify="space-between">
        <Col flex={1}>
          <RoomList
            listRoom={[
              { status: 'AVAILABLE', name: '1' },
              { status: 'AVAILABLE', name: '2' },
              { status: 'AVAILABLE', name: '3' },
              { status: 'AVAILABLE', name: '4' },
              { status: 'AVAILABLE', name: '5' },
            ]}
          />
        </Col>
        <Col className="group-right-panel">
          <div className="list-user">
            <UserList
              userList={userListOnline}
              visible={toggleUserList}
              onClose={handleOnClose}
            ></UserList>
          </div>
          <Chat />
        </Col>
      </Row>
    </StyledDashboard>
  );
};

export default memo(Dashboard);
