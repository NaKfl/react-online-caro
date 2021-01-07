import styled from 'styled-components';

export const StyledChat = styled.div`
  display: flex;
  flex-direction: column;
  height: ${({ height }) =>
    typeof height === 'string' && height.includes('%')
      ? `${height}`
      : height
      ? `${height}px`
      : `350px`};
  width: 100%;
  .chat-list {
    display: inline-block;
    height: 100%;
    overflow-y: auto;
  }

  .chat-input {
    margin-top: 10px;
  }
`;
