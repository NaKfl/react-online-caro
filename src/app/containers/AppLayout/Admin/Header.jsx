import { memo } from 'react';
import Menu from 'app/components/Menu';
import { StyledHeader } from './styles';
import { Link } from 'react-router-dom';
export const Header = memo(() => {
  return (
    <StyledHeader>
      <Menu theme="dark" defaultSelectedKeys={['1']}>
        {/* <Menu.Item key="1"></Menu.Item> */}
      </Menu>
    </StyledHeader>
  );
});
