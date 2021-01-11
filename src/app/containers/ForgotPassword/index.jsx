import { Form, Input, Button } from 'antd';
import { memo } from 'react';
import { StyledLayout, StyledTitle, StyledCover } from './styles';

export const ForgotPassword = memo(() => {
  const swithStep = step => {
    switch (step) {
      case 0:
        return (
          <StyledLayout>
            <StyledCover>
              <StyledTitle level={2}>Forgot password</StyledTitle>
              <Form requiredMark={false} size="large" className="form">
                <Form.Item name="email" required label="Email">
                  <Input placeholder="Input your email here" />
                </Form.Item>
                <Form.Item>
                  <Button style={{ width: '100%' }} type="primary">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </StyledCover>
          </StyledLayout>
        );

      default:
        break;
    }
  };
  return <>{swithStep(0)}</>;
});

export default ForgotPassword;
