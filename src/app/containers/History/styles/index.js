import styled, { css } from 'styled-components';

export const StyledLayoutGame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
export const StyledSquare = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');
  font-family: 'Fredoka One', cursive !important;
  font-weight: 500;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 1px dashed rgba(0, 0, 0, 0.2);
  color: ${({ children }) => (children === 'x' ? 'red' : 'blue')};
  cursor: pointer;
  border-radius: 2px;
  width: calc(100% / 20);
  height: calc(100% / 20);
  &:hover {
    border: 2px solid rgba(0, 0, 0, 0.6);
  }

  ${({ disabled }) =>
    disabled &&
    css`
      &:hover {
        border: none;
      }
      pointer-events: none;
    `}
`;

export const StyledSideRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  max-height: 840px;
  width: 26%;
  & > * {
    width: 90%;
  }
  .list-user {
    flex: 1;
    padding-bottom: 10px;
  }
  margin: 0 20px;
`;

export const StyledSideLeft = styled.div`
  display: flex;
  width: 26%;
  height: 100%;
  max-height: 840px;
  justify-content: flex-end;
  padding-right: 44px;
`;

export const StyledRow = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const StyledRoomHeader = styled.div`
  display: flex;
  width: calc(100% + 50px);
  height: 64px;
  background-color: #222;
  margin: -25px;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
  color: white;
`;

export const StyledRoomFooter = styled.div`
  display: flex;
  width: calc(100% + 50px);
  height: 64px;
  background-color: #222;
  margin: -25px;
  align-items: center;
  justify-content: space-around;
  font-weight: bold;
  font-size: 18px;
  color: white;
`;

export const StyledBoardOverlay = styled.div`
  flex: 1;
  position: relative;
  height: 100%;
  max-height: 840px;
`;
