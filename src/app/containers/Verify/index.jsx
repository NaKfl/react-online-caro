import { Result, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { memo } from 'react';
import { StyledLayout } from './styles';
import useHooks from './hooks';
import { useInjectSaga, useInjectReducer } from 'utils/reduxInjectors';
import saga from './saga';
import { sliceKey, reducer } from './slice';
import { STATUS } from 'utils/constants';

export const Verify = memo(() => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { selectors } = useHooks();
  const { status, counter } = selectors;
  return (
    <StyledLayout>
      <Result
        icon={status === STATUS.PENDING && <LoadingOutlined />}
        status={status === STATUS.SUCCESS && 'success'}
        title={
          status === STATUS.SUCCESS
            ? 'Verify Account Success'
            : 'Waiting Verify Your Account'
        }
        subTitle={
          status === STATUS.SUCCESS
            ? `Website will to redirect to home in ${counter}s`
            : ''
        }
        extra={[
          <Button
            type="primary"
            key="console"
            loading={status === STATUS.PENDING}
          >
            Go to home
          </Button>,
          <Button key="buy">Cancel</Button>,
        ]}
      />
    </StyledLayout>
  );
});
export default Verify;
