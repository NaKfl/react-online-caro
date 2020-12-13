import useActions from 'hooks/useActions';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { makeSelectAuthenticationStatus } from './selectors';
import { actions } from './slice';
import socket from 'utils/socket';
import { getAuthInfo } from 'utils/localStorageUtils';

export const useHooks = () => {
  const { login, loginService } = useActions(
    { login: actions.login, loginService: actions.loginService },
    [actions],
  );
  const status = useSelector(makeSelectAuthenticationStatus);
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

  return {
    handlers: { onFinish, handleLoginService },
    selectors: { status },
  };
};

export const useLogout = () => {
  const { logout } = useActions({ logout: actions.logout });

  const onLogout = useCallback(() => {
    const userInfo = getAuthInfo()?.user;
    if (userInfo) {
      socket.emit('client-logout', { user: userInfo });
    }
    logout();
  }, [logout]);

  return {
    handlers: { onLogout },
  };
};

export default useHooks;
