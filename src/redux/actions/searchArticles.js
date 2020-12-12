import http from '../../helpers/http';

export default {
  searchArticles: (token, search = '', page = 1) => {
    return {
      type: 'SEARCH_ARTICLES',
      payload: http(token).get(`news?search=${search}&page=${page}`),
    };
  },
};
