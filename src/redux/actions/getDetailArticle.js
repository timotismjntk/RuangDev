import http from '../../helpers/http';

export default {
  getDetailArticles: (token, id) => {
    console.log(`ini id nya : ${id}`);
    return {
      type: 'GET_DETAIL_ARTICLE',
      payload: http(token).get(`news/${id}`),
    };
  },
};
