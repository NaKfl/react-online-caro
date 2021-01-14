import { Button, Col, Input, Radio, Row, Typography } from 'antd';
import {
  ChromeOutlined,
  DoubleRightOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { ModalCreateRoom } from 'app/components/ModalCreateRoom';
import Room from 'app/components/Room';
import React, { memo } from 'react';
import { STATUS } from 'utils/constants';
import useHooks from './hooks';
export const RoomList = props => {
  const { handleJoinRoom, handleEnterInput, showModalMatching } = props;
  const { selectors, handlers, states } = useHooks(props);
  const { isShowModal } = states;
  const {
    handleOnChangeRadio,
    handleSearch,
    handleCreateRoom,
    handleCancel,
    handleShowModal,
  } = handlers;
  const { listRoom } = selectors;
  return (
    <div>
      <Row align="middle">
        <Col style={{ padding: '0 20px' }}>
          <Button
            style={{ display: 'flex', alignItems: 'center' }}
            icon={<ChromeOutlined />}
            onClick={showModalMatching}
          >
            Find Game
          </Button>
        </Col>
        {/* <Col style={{ padding: '0 20px' }}>
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
        </Col> */}
        <Col>
          <Button onClick={handleShowModal}>Create Room</Button>
        </Col>
        <Col style={{ padding: '0 20px' }}>
          <Input
            placeholder="Input search text"
            suffix={<SearchOutlined />}
            onChange={handleSearch}
            allowClear
          />
        </Col>
        <Col>
          <Input
            suffix={<DoubleRightOutlined />}
            placeholder="Input room id"
            allowClear
            onPressEnter={handleEnterInput}
          />
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
      <ModalCreateRoom
        isModalVisible={isShowModal}
        handleCancel={handleCancel}
        handleSubmit={handleCreateRoom}
      />
    </div>
  );
};
export default memo(RoomList);
