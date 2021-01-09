import { WEB_API } from 'configs';
import request, { handleGeneralError } from '../index';

export const getList = () => {
  request(WEB_API, {
    url: 'game',
    method: 'GET',
  })
    .then(({ data }) => data.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
};

export const getListGameByUser = () => {
  request(WEB_API, {
    url: 'game/user',
    method: 'GET',
  })
    .then(({ data }) => data.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
};
