/* eslint-disable prettier/prettier */
import {combineReducers} from 'redux';

import auth from './auth';
import getArticle from './getArticles';
import getDetailArticle from './getDetailArticle';
import searchArticles from './searchArticles';
import myArticles from './myArticles';
import postArticle from './postArticle';
import author from './author';
import dropDown from './dropDown';
import profile from './profile';
import comments from './comments';
import likes from './likes';

export default combineReducers({
  auth,
  getArticle,
  getDetailArticle,
  searchArticles,
  myArticles,
  postArticle,
  author,
  dropDown,
  profile,
  comments,
  likes,
});
