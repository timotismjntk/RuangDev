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
  checkTokenExpired: (token) => ({
    type: 'CHECK_REFRESH_TOKEN',
    payload: http(token).post('auth/verify/token'),
  }),
  getResetCode: (email) => ({
    type: 'GET_RESET_CODE',
    payload: http().post('auth/reset', qs.stringify({email})),
  }),
  verifyResetCode: (email, resetCode) => ({
    type: 'VERIFY_RESET_CODE',
    payload: http().post('auth/verify/reset', qs.stringify({email, resetCode})),
  }),
};
