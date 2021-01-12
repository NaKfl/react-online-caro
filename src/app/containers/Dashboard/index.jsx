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
import Loading from 'app/components/Modal/Loading';

export const Dashboard = props => {
  useInjectReducer({ key: sliceKey, reducer });
  const { states, selectors, handlers } = useHooks(props);
  const { onlineUserList, roomList, rankList } = selectors;
  const { isShowModalPass, isMatching, matchingGame, refCountDown } = states;
  const {
    handleCancelPass,
    handleCheckPassword,
    handleJoinRoom,
    handleEnterInput,
    showModalMatching,
    handleCancelMatching,
    handlePushToGame,
    handleMatchingOtherRank,
  } = handlers;
  return (
    <StyledDashboard>
      <Row justify="space-between">
        <Col flex={1}>
          <RoomList
            handleEnterInput={handleEnterInput}
            handleJoinRoom={handleJoinRoom}
            listRoom={roomList}
            showModalMatching={showModalMatching}
          />
        </Col>
        <Col className="group-right-panel">
          <div className="list-online">
            <UserList
              title="Online Users"
              isInRoom={false}
              userList={onlineUserList}
            ></UserList>
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
      <Loading
        visible={isMatching}
        matchingGame={matchingGame}
        refCountDown={refCountDown}
        handlePushToGame={handlePushToGame}
        handleMatchingOtherRank={handleMatchingOtherRank}
        onCancel={handleCancelMatching}
      />
    </StyledDashboard>
  );
};

export default memo(Dashboard);
