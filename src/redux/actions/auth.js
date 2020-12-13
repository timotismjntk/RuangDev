/* eslint-disable prettier/prettier */
import http from '../../helpers/http';
import qs from 'qs';


export default {
  signUp: (data) => ({
    type: 'SIGNUP_USER',
    payload: http().post('auth/signup/', qs.stringify(data)),
  }),
  login: (email, password) => ({
    type: 'AUTH_USER',
    payload: http().post('auth/login', qs.stringify({email, password})),
  }),
  logout: () => ({
    type: 'LOGOUT_USER',
  }),
  clearMessage: () => ({
    type: 'CLEAR_MESSAGE',
  }),
  setToken: (payload) => ({
    type: 'persist/REHYDRATED',
    payload,
  }),
};
