import styled from 'styled-components';
import { COLOR } from 'styles/colorPalette';

export const StyledPlayerCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 220px;
  width: 220px;
  padding-bottom: 13px;

  border-radius: 20px;
  background-color: ${COLOR.PRIMARY};
  box-shadow: 0px 4px 16px ${COLOR.SHADOW_GRAY};
  color: ${COLOR.WHITE};
`;

export const StyledName = styled.div`
  margin: 0;
  font-size: 16px;
  font-weight: bold;

  background-color: ${COLOR.SECONDARY};
  color: ${COLOR.WHITE};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  border: none;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  width: 100%;
`;

export const StyledLevel = styled.p`
  margin: 0;
  opacity: 0.7;
`;
