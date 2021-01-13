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
  return request(WEB_API, {
    url: 'user/verify',
    method: 'POST',
    data: {
      ...payload,
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

export const requestForgotPassword = ({ email }) => {
  return request(WEB_API, {
    url: `user/forgotpassword`,
    method: 'POST',
    data: {
      email,
    },
  })
    .then(res => res.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
};

export const requestRecoveryPassword = payload => {
  return request(WEB_API, {
    url: `user/recoverypassword`,
    method: 'POST',
    data: {
      ...payload,
    },
  })
    .then(res => res.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
};

export const fetchInfoUser = payload => {
  return request(WEB_API, {
    url: `user/${payload}`,
    method: 'GET',
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
};
