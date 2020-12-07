import React from 'react';
import CommonLayout from 'app/containers/AppLayout/CommonLayout';
import { StyledDashboard } from './styles';

const Dashboard = props => {
  return (
    <CommonLayout>
      <StyledDashboard>Hello World!</StyledDashboard>
    </CommonLayout>
  );
};

export default Dashboard;
