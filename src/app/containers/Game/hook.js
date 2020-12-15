import useActions from 'hooks/useActions';
import { useSelector } from 'react-redux';
import { actions } from './slice';
import { makeSquarePerRow, makeBoardHistory } from './selectors';
export const useHooks = () => {
  const squarePerRow = useSelector(makeSquarePerRow);
  const boardHistory = useSelector(makeBoardHistory);
  return { selector: { squarePerRow, boardHistory } };
};
