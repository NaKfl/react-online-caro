import { memo } from 'react';
import { Header } from './Header';
import StyledSider from './Sider';
import { StyledLayout, StyledMain, StyledContent } from './styles';
export const AdminLayout = ({ children }) => {
  return (
    <StyledLayout>
      <StyledSider />
      <StyledMain>
        <Header />
        <StyledContent>
          <div className="content">{children}</div>
        </StyledContent>
      </StyledMain>
    </StyledLayout>
  );
};
export default memo(AdminLayout);
