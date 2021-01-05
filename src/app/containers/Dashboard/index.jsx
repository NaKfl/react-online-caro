import React, { memo } from 'react';
import UserList from './UserList';
import { ChatWorld } from 'app/containers/Chat';
import { StyledDashboard } from './styles';
import { useHooks } from './hooks';
import RoomList from './RoomList';
import { Col, Row } from 'antd';
import { sliceKey, reducer } from './slice';
import { useInjectReducer } from 'utils/reduxInjectors';

export const Dashboard = props => {
  useInjectReducer({ key: sliceKey, reducer });
  const { states, selectors, handlers } = useHooks(props);
  const { onlineUserList, roomList } = selectors;
  const { toggleUserList } = states;
  const { handleOnClose } = handlers;

  return (
    <StyledDashboard>
      <Row justify="space-between">
        <Col flex={1}>
          <RoomList listRoom={roomList} />
        </Col>
        <Col className="group-right-panel">
          <div className="list-user">
            <UserList
              userList={onlineUserList}
              visible={toggleUserList}
              onClose={handleOnClose}
            ></UserList>
          </div>
          <ChatWorld height="50%" />
        </Col>
      </Row>
    </StyledDashboard>
  );
};

export default memo(Dashboard);
