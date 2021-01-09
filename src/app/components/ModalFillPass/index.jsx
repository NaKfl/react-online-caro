import React, { memo } from 'react';
import { Modal, Button } from 'antd';
import Form from 'app/components/Form';
import Input from 'app/components/Input';

export const ModalFillPass = props => {
  const { isModalVisible, handleCancel, handleSubmit } = props;
  return (
    <Modal
      title="Password of room"
      visible={isModalVisible}
      closable={false}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" form="form" htmlType="submit" type="primary">
          Submit
        </Button>,
      ]}
    >
      <Form className="register-form" id="form" onFinish={handleSubmit}>
        <Form.Item name="password">
          <Input.Password type="password" placeholder={'Password'} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default memo(ModalFillPass);
