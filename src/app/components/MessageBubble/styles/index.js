import styled, { css } from 'styled-components';
import { COLOR } from 'styles/colorPalette';

export const StyledMessageBubble = styled.div`
  position: relative;
  border-radius: 0.4em;
  padding: 10px;
  color: ${COLOR.WHITE};
  width: fit-content;
  max-width: 250px;

  ${({ direction }) =>
    direction === 'right'
      ? css`
          background: ${COLOR.PRIMARY};
          margin-left: auto;
        `
      : css`
          background: ${COLOR.NICKEL};
          margin-right: auto;
        `}

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-bottom: 0;
    margin-top: -5px;
    ${({ direction }) =>
      direction === 'right'
        ? css`
            right: 0;
            border-left-color: ${COLOR.PRIMARY};
            border-right: 0;
            margin-right: -10px;
          `
        : css`
            left: 0;
            border-right-color: ${COLOR.NICKEL};
            border-left: 0;
            margin-left: -10px;
          `}
  }
`;

export const StyledTime = styled.div`
  text-align: ${({ direction }) => (direction === 'right' ? 'left' : 'right')};
  font-size: 10px;
  font-style: italic;
  margin-top: 5px;
  opacity: 0.6;
`;
