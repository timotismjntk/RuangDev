/* eslint-disable prettier/prettier */
import http from '../../helpers/http';
import qs from 'qs';


export default {
  login: (email, password) => ((console.log(email)), {
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
