import { notification, Button } from 'antd';

export function notifyError(message) {
  notification.error({
    message: message,
    placement: 'topRight',
    top: 90,
  });
}

export function notifySuccess(message) {
  notification.success({
    message: message,
    placement: 'topRight',
    top: 90,
  });
}

export const openNotification = (handleConfirm, roomId) => {
  const btn = (
    <Button type="primary" size="small" onClick={handleConfirm}>
      Join room
    </Button>
  );
  notification.open({
    message: 'You are joining another room',
    description: `You are in room : ${roomId}`,
    btn,
  });
};
