import {
  makeSelectIsAuthenticated,
  makeSelectAuthenticationInfo,
} from 'app/containers/Login/selectors';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

export const useHooks = () => {
  const isAuthenticated = useSelector(makeSelectIsAuthenticated);

  return {
    selectors: {
      isAuthenticated,
    },
    handler: {},
  };
};

export const useAuthenticatedRedirect = () => {
  const history = useHistory();
  const location = useLocation();
  const isRedirect = ['/login', '/register'].includes(location.pathname);
  const { from } = location.state || { from: { pathname: '/' } };
  const isAuthenticated = useSelector(makeSelectIsAuthenticated);
  const info = useSelector(makeSelectAuthenticationInfo);

  useEffect(() => {
    if (isAuthenticated && isRedirect) {
      if (info.isAdmin) {
        history.push('/admin/user');
      } else history.replace(from);
    }
  }, [isAuthenticated, history, from, isRedirect, info]);
};

export default useHooks;
