import { useState, useCallback, useEffect } from 'react';
import useActions from 'hooks/useActions';
import { useSelector } from 'react-redux';
import { actions } from './slice';
import { makeSquarePerRow, makeBoardHistory } from './selectors';
import { getUser as getUserFromStorage } from 'utils/localStorageUtils';
import get from 'lodash/fp/get';
import socket from 'utils/socket';
import { useRouteMatch } from 'react-router-dom';

export const useHooks = () => {
  const squarePerRow = useSelector(makeSquarePerRow);
  const boardHistory = useSelector(makeBoardHistory);
  const match = useRouteMatch('/game/:id');
  const roomId = get('params.id', match);
  useEffect(() => {
    const user = getUserFromStorage();
    if (user) socket.emit('client-join-wait-room', { roomId, user });
  }, []);
  return { selector: { squarePerRow, boardHistory } };
};
