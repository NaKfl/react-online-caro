import React, { memo } from 'react';
import {
  StyledModal,
  StyledProfile,
  StyledUserItem,
  StyledUserStatus,
  StyledTextStatus,
  StyledAvatar,
  StyledBadge,
  StyledName,
  StyledPart,
} from '../styles';
import Button from 'app/components/Button';
import Form from 'app/components/Form';
import Input from 'app/components/Input';
import { Row, Col, Avatar } from 'antd';
import { USER_STATUS } from 'utils/constants';
import classifyRank from 'utils/classifyRank';
import moment from 'moment';
import { sliceKey, reducer } from './slice';
import { useInjectSaga, useInjectReducer } from 'utils/reduxInjectors';
import saga from './saga';
import useHooks from './hooks';

const Confirm = memo(props => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { selectors } = useHooks(props);
  const { userInfo } = selectors;
  const { visible, onCancel, user, ...rest } = props;
  const { status } = user;
  const {
    name,
    email,
    avatar,
    point,
    createdAt,
    totalMatches,
    winMatches,
  } = userInfo;

  return (
    <StyledModal
      centered
      closable={false}
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Return
        </Button>,
      ]}
      {...rest}
    >
      <StyledProfile>
        <Form
          // form={form}
          className="profile-form"
          requiredMark={false}
          initialValues={userInfo}
          layout="vertical"
        >
          <Row className="mb-4">
            <StyledUserItem {...rest}>
              <StyledPart>
                <StyledAvatar>
                  <Avatar size={80} src={avatar} />
                  {status && <StyledBadge color={USER_STATUS[status].color} />}
                </StyledAvatar>
                <StyledUserStatus>
                  <StyledName>{name}</StyledName>
                  {status && (
                    <StyledTextStatus color={USER_STATUS[status].color}>
                      {USER_STATUS[status].title}
                    </StyledTextStatus>
                  )}
                </StyledUserStatus>
              </StyledPart>
            </StyledUserItem>
          </Row>

          <Row gutter={[24, 0]}>
            <Col span={12}>
              <Form.Item label="Name">
                <Input disabled value={name} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Email">
                <Input disabled value={email} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Rank">
                <Input value={classifyRank(point)} disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Point">
                <Input disabled value={point} />
              </Form.Item>
            </Col>
            <Col span={12} className="final-input">
              <Form.Item label="Total matches">
                <Input
                  value={`${totalMatches} ${
                    totalMatches && winMatches
                      ? `(Win rate: ${Math.round(
                          (winMatches / totalMatches) * 100,
                          0,
                        )}%)`
                      : ``
                  }`}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col span={12} className="final-input">
              <Form.Item label="Registration Date">
                <Input
                  disabled
                  value={moment(createdAt).format('YYYY-MM-DD')}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </StyledProfile>
    </StyledModal>
  );
});

export default Confirm;
