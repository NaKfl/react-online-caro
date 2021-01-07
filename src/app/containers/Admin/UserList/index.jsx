import { memo } from 'react';
import Table from './Table';
import Title from 'app/components/Title';
import { StyledLayout } from './styles';
export const UserList = ({ ...props }) => {
  return (
    <StyledLayout>
      <Title level={4}>List of User</Title>
      <Table />
    </StyledLayout>
  );
};
export default memo(UserList);
