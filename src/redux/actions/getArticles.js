/* eslint-disable prettier/prettier */
import http from '../../helpers/http';

export default {
  getArticles: (sort = '', page = 1) => {
    return {
      type: 'GET_ARTICLES',
      payload: http().get(`news?sort=${sort}&page=${page}`),
    };
  },
};
