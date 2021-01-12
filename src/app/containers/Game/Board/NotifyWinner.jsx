import { StyledNotifiWinner } from '../styles';
import { Button } from 'antd';
import { memo } from 'react';

export const NotifyWinner = memo(({ status, winner, resetGame }) => {
  return (
    <StyledNotifiWinner>
      {status}
      <Button
        size="large"
        type="primary"
        style={{ margin: '0px 10px' }}
        onClick={resetGame}
      >
        Play again
      </Button>
    </StyledNotifiWinner>
  );
});
