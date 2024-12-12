import { default as _axios } from 'axios';

const axios = _axios.create({
  baseURL: 'http://3.25.58.118:8888',
  // withCredentials: true,
  validateStatus: (status) => [200, 400, 401].includes(status),
});

export { axios };
