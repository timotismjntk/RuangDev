import http from '../../helpers/http';
import qs from 'qs';

export default {
  getProfile: (token) => {
    return {
      type: 'GET_PROFILE',
      payload: http(token).get('users'),
    };
  },
  updatePassword: (token, data) => {
    return {
      type: 'UPDATE_PASSWORD',
      payload: http(token).patch('users', qs.stringify(data)),
    };
  },
  updateProfile: (token, data) => {
    return {
      type: 'PATCH_PROFILE',
      payload: http(token).patch('users', data),
    };
  },
  uploadProfileImage: (token, data) => {
    return {
      type: 'PATCH_PROFILE_IMAGE',
      payload: http(token).patch('users/update/picture', data),
    };
  },
  deleteProfile: (token) => {
    return {
      type: 'DELETE_PROFILE',
      payload: http(token).patch('users'),
    };
  },
  resetPassword: (data) => {
    return {
      type: 'RESET_PASSWORD',
      payload: http().patch('users/reset/password', qs.stringify(data)),
    };
  },
  removeMessage: () => {
    return {
      type: 'REMOVE_MESSAGE',
    };
  },
};
