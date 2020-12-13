import http from '../../helpers/http';
import qs from 'qs';

export default {
  postLikes: (token, data) => {
    return {
      type: 'POST_LIKES',
      payload: http(token).post('likes', qs.stringify(data)),
    };
  },
  clearMessage: () => ({
    type: 'CLEAR_MESSAGE',
  }),
};
