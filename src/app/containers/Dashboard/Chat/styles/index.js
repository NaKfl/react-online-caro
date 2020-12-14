import styled from 'styled-components';

export const StyledChat = styled.div`
  display: flex;
  flex-direction: column;
  .chat-list {
    display: inline-block;
    height: 400px;
    overflow-y: auto;
  }

  .chat-input {
    margin-top: 10px;
  }
`;
