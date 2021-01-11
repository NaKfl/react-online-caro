import { useSelector } from 'react-redux';
import { actions } from './slice';
import {
  makeStep,
  makeStepError,
  makeStatus,
  makeRecoverStatus,
} from './selectors';
import { useHistory } from 'react-router-dom';
import useActions from 'hooks/useActions';
import { useEffect, useMemo } from 'react';
import { getUser } from 'utils/localStorageUtils';
import queryString from 'query-string';

export const useHooks = () => {
  const history = useHistory();
  const { location } = history;
  const step = useSelector(makeStep);
  const stepError = useSelector(makeStepError);
  const recoverStatus = useSelector(makeRecoverStatus);
  const searchKey = queryString.parse(history.location.search);

  const status = useSelector(makeStatus);
  const { sendMail, increaseStep, requestRecovery } = useActions(
    {
      sendMail: actions.sendMail,
      increaseStep: actions.increaseStep,
      requestRecovery: actions.requestRecovery,
      fetch: actions.fetch,
    },
    [actions],
  );

  const submitEmail = ({ email }) => {
    sendMail({ email });
  };
  const submitRecovery = ({ password, confirm }) => {
    requestRecovery({ password, confirm, ...searchKey });
  };
  const goHome = () => {
    history.push('/');
  };

  const user = useMemo(() => {
    return getUser();
  }, []);
  useEffect(() => {
    if (!!user) {
      history.push('/');
    }
  }, [history, user]);
  useEffect(() => {
    if (location?.search.includes('secretKey')) {
      increaseStep(2);
    }
  }, [increaseStep, location]);
  return {
    handles: {
      submitEmail,
      stepError,
      goHome,
      submitRecovery,
    },
    selectors: { step, status, recoverStatus },
  };
};
export default useHooks;
