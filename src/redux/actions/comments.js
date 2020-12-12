import http from '../../helpers/http';

export default {
  getComments: (token, id, sort = '', page = 1) => {
    return {
      type: 'GET_COMMENT',
      payload: http(token).get(`comments/${id}`),
    };
  },
};
