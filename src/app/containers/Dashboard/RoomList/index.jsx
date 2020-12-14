import React, { memo } from 'react';
import Room from 'app/components/Room';
import { Col, Row, Radio, Typography, Input, Button } from 'antd';
import { STATUS } from 'utils/constants';
import useHooks from './hooks';
export const RoomList = props => {
  const { selectors, handlers, states } = useHooks();
  const { handleOnChangeRadio } = handlers;
  return (
    <div>
      <Row className="filter-room" justify="space-between" align="middle">
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
          <Button>Create Room</Button>
        </Col>
        <Col style={{ padding: '0 20px' }}>
          <Input.Search
            placeholder="Input search text"
            // onSearch={this.handleSearch}
            // onChange={this.handleSearch}
            allowClear
          />
        </Col>
        <Col flex={1} style={{ minWidth: '60px' }}>
          <Typography.Text>Total: 50</Typography.Text>
        </Col>
      </Row>
      <Row>
        <Col style={{ padding: '15px' }} span={4}>
          <Room status="AVAILABLE" />
        </Col>
        <Col style={{ padding: '15px' }} span={4}>
          <Room status="PLAYING" />
        </Col>
        <Col style={{ padding: '15px' }} span={4}>
          <Room status="PLAYING" />
        </Col>
      </Row>
    </div>
  );
};
export default memo(RoomList);
