import React, { memo } from 'react';
import { Modal, Select, Button } from 'antd';
import Form from 'app/components/Form';
import Input from 'app/components/Input';

const { Option } = Select;

export const ModalCreateRoom = props => {
  const { isModalVisible, handleChange, handleSubmit } = props;
  return (
    <Modal
      title="Create Room"
      visible={isModalVisible}
      footer={[
        <Button key="back">Cancel</Button>,
        <Button
          key="submit"
          form="form"
          htmlType="submit"
          type="primary"
          //   loading={loading}
        >
          Submit
        </Button>,
      ]}
    >
      <Form className="register-form" id="form" onFinish={handleSubmit}>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: 'Please fill name of room',
            },
          ]}
        >
          <Input placeholder={'Name of room'} />
        </Form.Item>

        <Form.Item name="password">
          <Input.Password
            // prefix={<LockOutlined />}
            type="password"
            placeholder={'Password'}
          />
        </Form.Item>

        <Form.Item
          name="timePerStep"
          rules={[
            {
              required: true,
              message: 'Please choose time',
            },
          ]}
        >
          <Select
            // defaultValue="30"
            // style={{ width }}
            // onChange={handleChange}
            placeholder="Seconds per step"
          >
            <Option value="20">20</Option>
            <Option value="30">30</Option>
            <Option value="40">40</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default memo(ModalCreateRoom);
