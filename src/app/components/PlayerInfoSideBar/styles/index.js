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
  align-items: center;
  width: fit-content;
`;

export const StyledScore = styled.p`
  margin: 0;
  margin: 6px 0;
  font-size: 3.5em;
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

export const StyledButton = styled(Button)`
  &.ant-btn {
    background-color: ${({ color }) => color ?? '#1b1b1b'};
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
  margin-bottom: 10px;
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
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 1px;
  box-shadow: 0px 4px 16px ${COLOR.SHADOW_GRAY};
  max-width: 180px;
  padding-left: 15px;
`;
