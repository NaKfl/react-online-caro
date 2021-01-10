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
  const { selectors, handles } = useHooks();
  const { status, counter, expired } = selectors;
  const { goToHome, goToLogin } = handles;
  return (
    <StyledLayout>
      {!expired ? (
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
              onClick={goToHome}
            >
              Go to home
            </Button>,
            <Button key="buy">Cancel</Button>,
          ]}
        />
      ) : (
        <Result
          status="warning"
          title="Your active's link is expired"
          extra={
            <Button type="primary" key="console" onClick={goToLogin}>
              Go to login
            </Button>
          }
        />
      )}
    </StyledLayout>
  );
});
export default Verify;
