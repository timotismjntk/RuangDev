import http from '../../helpers/http';

export default {
  myArticles: (token, sort = 'createdAt') => {
    return {
      type: 'MY_ARTICLES',
      payload: http(token).get(`news/my/all?sort=${sort}`),
    };
  },
};
