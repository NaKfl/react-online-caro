import styled from 'styled-components';
import { Badge, Modal } from 'antd';

export const StyledModal = styled(Modal)``;

export const StyledProfile = styled.div`
  display: flex;
  justify-content: center;
  .profile-form {
    max-width: 800px;
    .group-info {
      justify-content: center;
      display: flex;
      flex-direction: column;
      > h5 {
        margin: 0;
        opacity: 0.7;
        font-weight: normal;
      }
    }
  }
  .final-input {
    .ant-form-item {
      margin-bottom: 0;
    }
  }
  .ant-input-disabled {
    background-color: white;
    color: black;
    cursor: default;
  }
`;

export const StyledUserItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const StyledPart = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledAvatar = styled.div`
  position: relative;
`;

export const StyledBadge = styled(Badge)`
  position: absolute;
  right: -2px;
  bottom: 2px;
  .ant-badge-status-dot {
    display: inline-block;
    width: 13px;
    height: 13px;
  }
`;

export const StyledUserStatus = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
`;

export const StyledTextStatus = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${({ color }) => color ?? 'black'};
`;

export const StyledName = styled.p`
  margin: 0;
  font-size: 18px;
`;
