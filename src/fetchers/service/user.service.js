import { WEB_API } from 'configs';
import request, { handleGeneralError } from '../index';

export const getList = () => {
  return request(WEB_API, {
    url: 'user',
    method: 'GET',
  })
    .then(res => res.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
};
export const update = payload => {
  return request(WEB_API, {
    url: 'user',
    method: 'PATCH',
    data: {
      ...payload,
    },
  })
    .then(res => res.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
};
export const getRate = payload => {
  return request(WEB_API, {
    url: 'user/rate',
    method: 'POST',
    data: {
      ...payload,
    },
  })
    .then(({ data }) => {
      return data.data;
    })
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
};
