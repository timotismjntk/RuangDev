/* eslint-disable prettier/prettier */
import http from '../../helpers/http';

export default {
  getDetailArticles: (id) => {
      console.log(`ini id nya : ${id}`);
    return {
      type: 'GET_DETAIL_ARTICLE',
      payload: http().get(`news/${id}`),
    };
  },
};
