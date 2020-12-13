import http from '../../helpers/http';

export default {
  postArticle: (token, data) => {
    return {
      type: 'POST_ARTICLE',
      payload: http(token).post('news', data),
    };
  },
  clearMessage: () => ({
    type: 'CLEAR_MESSAGE',
  }),
};
