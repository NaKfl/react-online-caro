import styled from 'styled-components';
import { COLOR } from 'styles/colorPalette';
import Button from 'app/components/Button';

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
    transition: none;

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

export const StyledGameButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
  &,
  & > * {
    pointer-events: ${({ disabled }) => (disabled ? 'none' : 'unset')};
    opacity: ${({ disabled }) => (disabled ? 0.8 : 1)};
  }
`;

export const StyledTitle = styled.div`
  flex: 1;
  background-color: ${({ color }) => color ?? COLOR.NICKEL};
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
  padding: 0 15px;
`;
