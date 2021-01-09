import { Button, Col, Input, Radio, Row, Typography } from 'antd';
import { ModalCreateRoom } from 'app/components/ModalCreateRoom';
import { ModalFillPass } from 'app/components/ModalFillPass';
import Room from 'app/components/Room';
import React, { memo } from 'react';
import { STATUS } from 'utils/constants';
import useHooks from './hooks';
export const RoomList = props => {
  const { selectors, handlers, states } = useHooks(props);
  const { isShowModal, isShowModalPass } = states;
  const {
    handleOnChangeRadio,
    handleSearch,
    handleJoinRoom,
    handleCreateRoom,
    handleCancel,
    handleShowModal,
    handleCancelPass,
    handleCheckPassword,
  } = handlers;
  const { listRoom } = selectors;
  return (
    <div>
      <Row justify="space-between" align="middle">
        <Col style={{ padding: '0 20px' }}>
          <Radio.Group
            onChange={handleOnChangeRadio}
            defaultValue={0}
            buttonStyle="solid"
          >
            <Radio.Button value={0}>All</Radio.Button>
            <Radio.Button value={STATUS.WAITING.value}>
              {STATUS.WAITING.title}
            </Radio.Button>
            <Radio.Button value={STATUS.PLAYING.value}>
              {STATUS.PLAYING.title}
            </Radio.Button>
          </Radio.Group>
        </Col>
        <Col>
          <Button onClick={handleShowModal}>Create Room</Button>
        </Col>
        <Col style={{ padding: '0 20px' }}>
          <Input.Search
            placeholder="Input search text"
            onSearch={handleSearch}
            onChange={handleSearch}
            allowClear
          />
        </Col>
        <Col flex={1} style={{ minWidth: '60px' }}>
          <Typography.Text>Total: 50</Typography.Text>
        </Col>
      </Row>
      <Row>
        {listRoom.map((room, index) => {
          return (
            <Col key={room.id} style={{ padding: '15px' }} span={4}>
              <Room
                password={!!room.password}
                id={room.id}
                handleJoinRoom={handleJoinRoom}
                status={room.status}
                name={room.name}
                joinId={room.joinId}
              />
            </Col>
          );
        })}
      </Row>
      <ModalFillPass
        isModalVisible={isShowModalPass}
        handleCancel={handleCancelPass}
        handleSubmit={handleCheckPassword}
      />
      <ModalCreateRoom
        isModalVisible={isShowModal}
        handleCancel={handleCancel}
        handleSubmit={handleCreateRoom}
      />
    </div>
  );
};
export default memo(RoomList);
