import useActions from 'hooks/useActions';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { actions } from './slice';
import { makeSelectUserList } from './selectors';
export const useHooks = () => {
  const { getList, updateRecord } = useActions(
    { getList: actions.getUserList, updateRecord: actions.updateRecord },
    [actions],
  );
  const userList = useSelector(makeSelectUserList);
  const handleBlock = ({ id, type }) => {
    if (type) {
      updateRecord({ id, isBlocked: false });
    } else {
      updateRecord({ id, isBlocked: true });
    }
  };
  useEffect(() => {
    getList();
  }, [getList]);
  return {
    selectors: {
      userList,
    },
    handles: {
      handleBlock,
    },
  };
};
export default useHooks;
