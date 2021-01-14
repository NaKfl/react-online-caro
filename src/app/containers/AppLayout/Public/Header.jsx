import React, { memo } from 'react';
import { StyledHeader } from '../styles';
import { Link } from 'react-router-dom';
export const PublicHeader = () => {
  return (
    <StyledHeader>
      <Link to="/">
        <div className="logo" />
      </Link>
    </StyledHeader>
  );
};

export default memo(PublicHeader);
