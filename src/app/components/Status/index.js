import Tag from '../Tag';
import { ACTION_STATUS } from 'utils/constants';
import { COLOR } from 'styles/colorPalette';
export const Status = ({ type }) => {
  switch (type) {
    case ACTION_STATUS.PENDING:
      return <Tag color={COLOR.SECONDARY}>#Pending</Tag>;
    case ACTION_STATUS.SUCCESS:
      return <Tag color={COLOR.GREEN}>#Active</Tag>;
    case ACTION_STATUS.FAILED:
      return <Tag color={COLOR.RED}>#Active</Tag>;
    default:
      return <Tag color={COLOR.SECONDARY}>#Pending</Tag>;
  }
};
export default Status;
