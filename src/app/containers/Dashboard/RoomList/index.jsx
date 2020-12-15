import { Button, Col, Input, Radio, Row, Typography } from 'antd';
import Room from 'app/components/Room';
import React, { memo } from 'react';
import { STATUS } from 'utils/constants';
import useHooks from './hooks';
export const RoomList = props => {
  const { selectors, handlers, states } = useHooks(props);
  const {
    handleOnChangeRadio,
    handleSearch,
    handleJoinRoom,
    handleCreateRoom,
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
            <Radio.Button value={STATUS.AVAILABLE.value}>
              Available
            </Radio.Button>
            <Radio.Button value={STATUS.PLAYING.value}>Playing</Radio.Button>
          </Radio.Group>
        </Col>
        <Col>
          <Button onClick={handleCreateRoom}>Create Room</Button>
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
                id={room.id}
                handleJoinRoom={handleJoinRoom}
                status={room.status}
                name={room.name}
              />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};
export default memo(RoomList);
