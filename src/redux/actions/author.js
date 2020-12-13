import http from '../../helpers/http';

export default {
  authorArticles: (token, id, sort = 'createdAt') => {
    return {
      type: 'AUTHOR_ARTICLES',
      payload: http(token).get(`news/other/${id}?sort=${sort}`),
    };
  },
};
