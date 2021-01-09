import { Modal, Button, Descriptions } from 'antd';
import { actions } from './slice';
import useActions from 'hooks/useActions';
import { useSelector } from 'react-redux';
import { makeVisible, makeCurrentUser, makeRate } from './selectors';
import { useEffect } from 'react';
export const UserDetail = () => {
  const visible = useSelector(makeVisible);
  const currentUser = useSelector(makeCurrentUser);
  const Rate = useSelector(makeRate);
  const { closeModal, getRate } = useActions(
    { closeModal: actions.closeModal, getRate: actions.getRate },
    [actions],
  );
  const {
    name,
    email,
    point,
    isBlocked,
    isActivated,
    isAdmin,
    id,
  } = currentUser;
  const user = {
    name,
    email,
    point,
    isBlocked: isBlocked ? 'true' : 'false',
    isActivated: isActivated ? 'true' : 'false',
    Admin: isAdmin ? 'true' : 'false',
    ...Rate,
  };
  useEffect(() => {
    if (visible) {
      getRate({ id });
    }
  }, [id, getRate, visible]);
  return (
    <Modal
      visible={visible}
      title={currentUser?.name}
      onCancel={closeModal}
      footer={[
        <Button key={'button'} type="primary" onClick={closeModal}>
          Close
        </Button>,
      ]}
    >
      <Descriptions bordered>
        {Object.keys(user).map((e, i) => (
          <Descriptions.Item label={e} key={i} span={3}>
            {user[e]}
          </Descriptions.Item>
        ))}
      </Descriptions>
    </Modal>
  );
};
