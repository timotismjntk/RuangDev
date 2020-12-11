/* eslint-disable prettier/prettier */
import {default as axios} from 'axios';

import {API_URL} from '@env';

const http = (token = false) => {
  console.log(API_URL);
  return axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      // 'content-type': 'multipart/form-data'
    },
  });
};

export default http;
