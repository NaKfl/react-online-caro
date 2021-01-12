import styled from 'styled-components';

export const StyledPlayerInfoSideBar = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const StyledPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: fit-content;
`;

export const StyledScore = styled.p`
  margin: 0;
  font-size: 3.5em;
  font-weight: bold;
  opacity: 0.8;
  img {
    margin: 14px 0;
    display: block;
    width: 50px;
    height: 50px;
  }
  .circle {
    width: 52px;
    height: 52px;
  }
`;

export const StyledDivider = styled.div`
  height: 3px;
  width: 150px;
  background: radial-gradient(
    ellipse at center,
    #c7c7c7 0%,
    rgba(255, 255, 255, 0) 70%
  );
`;

export const StyledRow = styled.div`
  display: flex;
  justify-content: center;
`;
