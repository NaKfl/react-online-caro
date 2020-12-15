import React, { memo } from 'react';
import { CheckCircleFilled } from '@ant-design/icons';
import { Row } from 'antd';
import { STATUS } from 'utils/constants';
import { StyledRoom } from './styles';
import { Link } from 'react-router-dom';
export const Room = props => {
  const { handleJoinRoom, id, status, name } = props;
  return (
    <>
      <StyledRoom
        hoverable
        actions={[
          <Link
            to={{
              pathname: `/game`,
              search: `?room=${id}`,
            }}
          >
            <div style={{ fontWeight: 700 }}>{`Join Room`}</div>
          </Link>,
          <div style={{ fontWeight: 700 }}>{`View`}</div>,
        ]}
        onClick={() => {
          if (status !== 'PLAYING') handleJoinRoom(id);
        }}
      >
        <Row justify="space-between" align="middle" className="status-line">
          <Row align="middle" style={{ color: STATUS[status].color }}>
            <CheckCircleFilled />
            <span className="status">{STATUS[status].title}</span>
          </Row>
        </Row>
        <div className="room-number">{name}</div>
      </StyledRoom>
    </>
  );
};

export default memo(Room);
