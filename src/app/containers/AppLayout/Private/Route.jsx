import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useHooks from '../hooks';

const PrivateRoute = ({ component, layout: Layout, ...rest }) => {
  const { selectors } = useHooks();
  const { isAuthenticated } = selectors;
  const renderFn = Component => ({ location, ...props }) => {
    if (!!Component && isAuthenticated) {
      return (
        <Layout location={location}>
          <Component {...props} />
        </Layout>
      );
    } else {
      return (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      );
    }
  };
  return <Route {...rest} render={renderFn(component)} />;
};

export default PrivateRoute;
