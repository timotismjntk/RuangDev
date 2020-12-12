/* eslint-disable prettier/prettier */
import http from '../../helpers/http';

export default {
  searchArticles: (search = '', page = 1) => {
    return {
      type: 'SEARCH_ARTICLES',
      payload: http().get(`news?search=${search}&page=${page}`),
    };
  },
};
