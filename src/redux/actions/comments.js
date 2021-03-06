import http from '../../helpers/http';
import qs from 'qs';

export default {
  getComments: (token, id, sort = 'DESC', page = 1) => {
    return {
      type: 'GET_COMMENT',
      payload: http(token).get(`comments/${id}&sort=${sort}`),
    };
  },
  postComment: (token, data) => {
    return {
      type: 'POST_COMMENT',
      payload: http(token).post('comments', qs.stringify(data)),
    };
  },
  clearMessage: () => ({
    type: 'CLEAR_MESSAGE',
  }),
};
