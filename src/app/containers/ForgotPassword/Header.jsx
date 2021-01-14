import { Steps } from 'antd';

const { Step } = Steps;

export const Header = ({ step = 0, stepError, ...props }) => {
  return (
    <Steps current={step} status={stepError && 'error'}>
      <Step title="Input field" description="Input your email" />
      <Step title="Check your email" />
      <Step title="Change your password" />
    </Steps>
  );
};
export default Header;
