import Avatar from 'app/components/Avatar';
import Dropdown from 'app/components/Dropdown';
import Menu from 'app/components/Menu';
import { useLogout } from 'app/containers/Login/hooks';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { StyledHeader } from './styles';
import { getUser as getUserFromStorage } from 'utils/localStorageUtils';

export const Header = () => {
  const user = getUserFromStorage();
  const { t } = useTranslation();
  const { handlers } = useLogout();
  const { onLogout } = handlers;

  return (
    <StyledHeader style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <div>
        <Dropdown
          trigger={['click']}
          overlay={
            <Menu>
              {!user.isAdmin && (
                <Menu.Item>
                  <Link to="/profile">{t('Header.linkProfile')}</Link>
                </Menu.Item>
              )}

              <Menu.Item onClick={onLogout}>{t('Header.linkLogout')}</Menu.Item>
            </Menu>
          }
        >
          <Avatar src={user?.avatar} />
        </Dropdown>
      </div>
    </StyledHeader>
  );
};

export default memo(Header);
