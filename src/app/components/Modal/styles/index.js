import styled from 'styled-components';
import { Badge, Modal } from 'antd';

export const StyledModal = styled(Modal)``;
export const StyledModalLoading = styled(Modal)`
  .ant-modal-content {
    background-color: transparent;
    box-shadow: none;
    .ant-modal-body {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  circle:nth-of-type(1) {
    fill: #ffffff;
  }
  circle:nth-of-type(2) {
    fill: #fcd837;
  }
  circle:nth-of-type(3) {
    fill: #f9a11f;
  }
  circle:nth-of-type(4) {
    fill: #f27c21;
  }

  #clackers {
    /*   border: 1px solid white; */
  }
`;

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

export const StyledSpinner = styled.div`
  display: inline-block;
  width: 100px;
  height: 100px;
  background: url('http://i.imgur.com/oSHLAzp.png') center center;
  background-size: contain;
  animation: spinner 5s infinite alternate ease-in-out;
`;

export const StyledSpinnerCenter = styled.div`
  display: inline-block;
  position: absolute;
  margin-left: -100px;
  width: 100px;
  height: 100px;
  background: url('http://i.imgur.com/u0BC2ZR.png') center center;
  background-size: contain;
  content: '';
`;

export const StyledLoadingText = styled.div`
  position: relative;
  z-index: 1;
  font-size: 1.5rem;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  margin-left: 0.5em;
`;

export const StyledRow = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledMessage = styled.p`
  font-size: 15px;
  margin-bottom: 0;
  margin-right: 5px;
`;
