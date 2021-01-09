import React, { memo } from 'react';
import UserList from './UserList';
import RankList from './RankList';
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
  const { onlineUserList, roomList, rankList } = selectors;
  const { isShowModalPass } = states;
  const {
    handleCancelPass,
    handleCheckPassword,
    handleJoinRoom,
    handleEnterInput,
  } = handlers;
  return (
    <StyledDashboard>
      <Row justify="space-between">
        <Col flex={1}>
          <RoomList
            handleEnterInput={handleEnterInput}
            handleJoinRoom={handleJoinRoom}
            listRoom={roomList}
          />
        </Col>
        <Col className="group-right-panel">
          <div className="list-online">
            <UserList isInRoom={false} userList={onlineUserList}></UserList>
          </div>
          <div className="list-rank">
            <RankList rankList={rankList} />
          </div>
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
