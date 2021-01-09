import styled from 'styled-components';
import { Badge } from 'antd';

export const StyledUserItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px 10px 25px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  cursor: pointer;
`;

export const StyledPart = styled.div`
  display: flex;
  align-items: center;

  &.name-and-status {
    flex: 1;
  }

  &.invite-button {
    padding-right: 10px;
  }
`;

export const StyledAvatar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  span {
    display: inline-block;
    font-weight: bold;
    width: 23px;
  }
`;

export const StyledBadge = styled(Badge)`
  position: absolute;
  right: -9px;
  bottom: -2px;
  .ant-badge-status-dot {
    display: inline-block;
    width: 10px;
    height: 10px;
  }
`;

export const StyledUserStatus = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
`;

export const StyledTextStatus = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${({ color }) => color ?? 'black'};
`;

export const StyledName = styled.p`
  margin: 0;
`;
