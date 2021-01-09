import React, { memo } from 'react';
import UserList from './UserList';
import RankList from './RankList';
import { StyledDashboard } from './styles';
import { useHooks } from './hooks';
import RoomList from './RoomList';
import { Col, Row } from 'antd';
import { sliceKey, reducer } from './slice';
import { useInjectReducer } from 'utils/reduxInjectors';

export const Dashboard = props => {
  useInjectReducer({ key: sliceKey, reducer });
  const { selectors } = useHooks(props);
  const { onlineUserList, roomList, rankList } = selectors;

  return (
    <StyledDashboard>
      <Row justify="space-between">
        <Col flex={1}>
          <RoomList listRoom={roomList} />
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
    </StyledDashboard>
  );
};

export default memo(Dashboard);
