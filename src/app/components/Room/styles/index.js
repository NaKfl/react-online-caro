import styled from 'styled-components';
import Card from 'app/components/Card';
export const StyledRoom = styled(Card)`
  background-color: rgba(0, 21, 41, 0.09);
  transition: ease-in 0.09s;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
  .room-number {
    text-align: center;
    font-size: 3.5rem;
    font-weight: 600;
    line-height: 5rem;
    letter-spacing: -1px;
    margin-top: 16px;
  }
  .status-line {
    font-weight: 600;
    .status {
      margin-left: 7px;
    }
    .room-type {
      margin-left: auto;
    }
  }
  .title-room {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    .group-title {
      display: flex;
      align-items: center;
    }
  }
`;
