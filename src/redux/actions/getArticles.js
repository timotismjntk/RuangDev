import http from '../../helpers/http';

export default {
  getArticles: (token, sort = '', page = 1) => {
    return {
      type: 'GET_ARTICLES',
      payload: http(token).get(`news?sort=${sort}&page=${page}`),
    };
  },
};
