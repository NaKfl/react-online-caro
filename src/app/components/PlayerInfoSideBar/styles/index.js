import styled from 'styled-components';
import { COLOR } from 'styles/colorPalette';
import Button from 'app/components/Button';

export const StyledPlayerInfoSideBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: fit-content;
`;

export const StyledPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: fit-content;
`;

export const StyledScore = styled.p`
  margin: 0;
  margin: 8px 0;
  font-size: 4em;
  font-weight: bold;
  opacity: 0.8;
`;

export const StyledDivider = styled.div`
  height: 3px;
  width: 150px;
  background: radial-gradient(
    ellipse at center,
    ${COLOR.SECONDARY} 0%,
    rgba(255, 255, 255, 0) 70%
  );
`;

export const StyledBackButton = styled(Button)`
  &.ant-btn {
    background-color: ${COLOR.RED};
    color: ${COLOR.WHITE};
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    border: none;
    border-top-left-radius: 0.4em;
    border-bottom-left-radius: 0.4em;
    width: 50px;

    &:after {
      content: none;
    }

    &:focus,
    &:hover {
      color: black;
      color: ${COLOR.WHITE};
    }
  }
`;

export const StyledRoomInfoGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledRoomName = styled.div`
  flex: 1;
  background-color: ${COLOR.NICKEL};
  color: ${COLOR.WHITE};
  height: 40px;
  border-top-right-radius: 0.4em;
  border-bottom-right-radius: 0.4em;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 1px;
`;
