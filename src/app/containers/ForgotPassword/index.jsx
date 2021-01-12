import { Form, Input, Button, Result } from 'antd';
import { memo } from 'react';
import { StyledLayout, StyledTitle, StyledCover, StyledMain } from './styles';
import Header from './Header';
import useHooks from './hooks';
import { useInjectSaga, useInjectReducer } from 'utils/reduxInjectors';
import { sliceKey, reducer } from './slice';
import saga from './saga';
import { MailOutlined } from '@ant-design/icons';
import { STATUS } from 'utils/constants';
import CountDown from 'react-countdown';

export const ForgotPassword = memo(() => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { selectors, handles } = useHooks();
  const { step, stepError, status, recoverStatus } = selectors;
  const { submitEmail, submitRecovery, goHome } = handles;

  const swithStep = step => {
    switch (step) {
      case 0:
        return (
          <StyledCover>
            <StyledTitle level={3}>Recover Password</StyledTitle>
            <Form
              requiredMark={false}
              size="large"
              className="form"
              onFinish={submitEmail}
            >
              <Form.Item name="email" required label="Email">
                <Input placeholder="Input your email here" />
              </Form.Item>
              <Form.Item>
                <Button
                  style={{ width: '100%' }}
                  type="primary"
                  htmlType="submit"
                  loading={status === STATUS.PENDING}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </StyledCover>
        );
      case 1:
        return (
          <Result
            status="success"
            icon={<MailOutlined />}
            title="Great, we sent email to you!"
            subTitle="Please check mail and flow the direction"
            extra={<Button type="primary">Go to home</Button>}
          />
        );
      case 2:
        return (
          <>
            {!!!(recoverStatus === STATUS.SUCCESS) ? (
              <StyledCover>
                <StyledTitle level={4}>It's is final step</StyledTitle>
                <Form
                  requiredMark={false}
                  size="large"
                  className="form"
                  onFinish={submitRecovery}
                  layout="vertical"
                >
                  <Form.Item
                    name="password"
                    required
                    label="Password"
                    hasFeedback
                  >
                    <Input
                      placeholder="Input your new password"
                      type="password"
                    />
                  </Form.Item>
                  <Form.Item
                    name="confirm"
                    required
                    label="Confirm password"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: 'Please confirm your password!',
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            'The confirm passwords do not match!',
                          );
                        },
                      }),
                    ]}
                  >
                    <Input
                      placeholder="Input your email here"
                      type="password"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      style={{ width: '100%' }}
                      type="primary"
                      htmlType="submit"
                      loading={recoverStatus === STATUS.PENDING}
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </StyledCover>
            ) : (
              <CountDown
                date={Date.now() + 5000}
                renderer={({ hours, minutes, seconds, completed }) => {
                  if (completed) {
                    goHome();
                  }
                  return (
                    <Result
                      status="success"
                      title="Well, you got it"
                      subTitle={`We will bring back you to home`}
                      extra={
                        <Button type="primary" onClick={goHome}>
                          Go home in {seconds}
                        </Button>
                      }
                    />
                  );
                }}
              />
            )}
          </>
        );
      default:
        break;
    }
  };
  return (
    <StyledLayout>
      <StyledMain>
        <Header step={step} error={stepError} />
        {swithStep(step)}
      </StyledMain>
    </StyledLayout>
  );
});

export default ForgotPassword;
