import styled from 'styled-components';
import { COLOR } from 'styles/colorPalette';

export const StyledLayout = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #f0f2f5;
`;

export const StyledContent = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 25px;
  .square-box {
    position: relative;
    width: 45%;
    overflow: hidden;
    box-shadow: 0px 4px 16px ${COLOR.SHADOW_GRAY};
  }
  .square-box:before {
    content: '';
    display: block;
    padding-top: 100%;
  }
  .square-content {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    color: white;
    text-align: center;
    display: flex;
    flex-wrap: wrap;
  }
`;
