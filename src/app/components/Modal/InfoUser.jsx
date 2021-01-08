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
} from './styles';
import Button from 'app/components/Button';
import Form from 'app/components/Form';
import Input from 'app/components/Input';
import { Row, Col, Avatar } from 'antd';
import { USER_STATUS } from 'utils/constants';

const Confirm = memo(props => {
  const { visible, onCancel, user, ...rest } = props;
  const { status, name, avatar } = user;
  const { color, title } = USER_STATUS[status];

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
          className="profile-form"
          requiredMark={false}
          initialValues={user}
          layout="vertical"
        >
          <Row className="mb-4">
            <StyledUserItem {...rest}>
              <StyledPart>
                <StyledAvatar>
                  <Avatar size={80} src={avatar} />
                  <StyledBadge color={color} />
                </StyledAvatar>
                <StyledUserStatus>
                  <StyledName>{name}</StyledName>
                  <StyledTextStatus color={color}>{title}</StyledTextStatus>
                </StyledUserStatus>
              </StyledPart>
            </StyledUserItem>
          </Row>

          <Row gutter={[24, 0]}>
            <Col span={12}>
              <Form.Item label="Name" name="name">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Email" name="email">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12} className="final-input">
              <Form.Item label="Rank" name="rank">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12} className="final-input">
              <Form.Item label="Point" name="point">
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </StyledProfile>
    </StyledModal>
  );
});

export default Confirm;
