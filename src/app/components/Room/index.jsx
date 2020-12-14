import React, { memo } from 'react';
import {
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
  CheckCircleFilled,
  ExclamationCircleFilled,
  InfoCircleFilled,
  ClockCircleFilled,
} from '@ant-design/icons';
import { Row } from 'antd';
import { STATUS } from 'utils/constants';
import { StyledRoom } from './styles';

export const Room = props => {
  const { status } = props;

  return (
    <>
      <StyledRoom
        hoverable
        actions={[
          <div style={{ fontWeight: 700 }}>{`Join Room`}</div>,
          <div style={{ fontWeight: 700 }}>{`View`}</div>,
        ]}
      >
        <Row justify="space-between" align="middle" className="status-line">
          <Row align="middle" style={{ color: STATUS[status].color }}>
            <CheckCircleFilled />
            <span className="status">{STATUS[status].title}</span>
          </Row>
        </Row>
        <div className="room-number">001</div>
      </StyledRoom>
    </>
  );
};

export default memo(Room);
