import React, { memo } from 'react';
import UserList from './UserList';
import { ChatWorld } from 'app/containers/Chat';
import { StyledDashboard } from './styles';
import { useHooks } from './hooks';
import RoomList from './RoomList';
import { Col, Row } from 'antd';
import { sliceKey, reducer } from './slice';
import { useInjectReducer } from 'utils/reduxInjectors';
import { ModalFillPass } from 'app/components/ModalFillPass';

export const Dashboard = props => {
  useInjectReducer({ key: sliceKey, reducer });
  const { states, selectors, handlers } = useHooks(props);
  const { onlineUserList, roomList } = selectors;
  const { isShowModalPass } = states;
  const { handleCancelPass, handleCheckPassword, handleJoinRoom } = handlers;
  return (
    <StyledDashboard>
      <Row justify="space-between">
        <Col flex={1}>
          <RoomList handleJoinRoom={handleJoinRoom} listRoom={roomList} />
        </Col>
        <Col className="group-right-panel">
          <div className="list-user">
            <UserList isInRoom={false} userList={onlineUserList}></UserList>
          </div>
          <ChatWorld height="50%" />
        </Col>
      </Row>
      <ModalFillPass
        isModalVisible={isShowModalPass}
        handleCancel={handleCancelPass}
        handleSubmit={handleCheckPassword}
      />
    </StyledDashboard>
  );
};

export default memo(Dashboard);
