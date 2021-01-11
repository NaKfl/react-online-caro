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

export const sendMailVerify = payload => {
  const { id, email } = payload;
  return request(WEB_API, {
    url: 'user/verify',
    method: 'POST',
    data: {
      id,
      email,
    },
  })
    .then(res => res.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
};

export const verify = payload => {
  const { url } = payload;
  return request(WEB_API, {
    url: `user/verify/${url}`,
    method: 'GET',
  })
    .then(res => res.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
};
