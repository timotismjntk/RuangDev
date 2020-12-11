/* eslint-disable prettier/prettier */
import http from '../../helpers/http';

export default {
  getArticles: (sort = '') => {
    return {
      type: 'GET_ARTICLES',
      payload: http().get(`news?sort=${sort}&limit=20`),
    };
  },
};
