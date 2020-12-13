import useActions from 'hooks/useActions';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  makeSelectAuthenticationStatus,
  makeSelectAuthenticationInfo,
} from './selectors';
import { actions } from './slice';
import { ACTION_STATUS } from 'utils/constants';
import socket from 'utils/socket';

export const useHooks = () => {
  const { login, loginService } = useActions(
    { login: actions.login, loginService: actions.loginService },
    [actions],
  );
  const status = useSelector(makeSelectAuthenticationStatus);
  const info = useSelector(makeSelectAuthenticationInfo);

  const onFinish = useCallback(
    values => {
      login(values);
    },
    [login],
  );

  const handleLoginService = useCallback(
    payload => {
      loginService(payload);
    },
    [loginService],
  );

  useEffect(() => {
    if (status === ACTION_STATUS.SUCCESS) {
      socket.emit('client-login', { user: info });
    }
  }, [info, status]);

  return {
    handlers: { onFinish, handleLoginService },
    selectors: { status },
  };
};

export const useLogout = () => {
  const info = useSelector(makeSelectAuthenticationInfo);
  const { logout } = useActions({ logout: actions.logout });

  const onLogout = useCallback(() => {
    logout();
    socket.emit('client-login', { user: info });
  }, [info, logout]);

  return {
    handlers: { onLogout },
  };
};

export default useHooks;
