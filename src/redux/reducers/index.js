/* eslint-disable prettier/prettier */
import {combineReducers} from 'redux';

import auth from './auth';
import getArticle from './getArticles';
import getDetailArticle from './getDetailArticle';
import searchArticles from './searchArticles';
import myArticles from './myArticles';
import dropDown from './dropDown';
import profile from './profile';
import comments from './comments';

export default combineReducers({
  auth,
  getArticle,
  getDetailArticle,
  searchArticles,
  myArticles,
  dropDown,
  profile,
  comments,
});


// const rootReducer = (state, action) => {
//   console.log(action);
//   if (action.type === 'LOGOUT_USER') {
//     // console.log('true');
//     state = undefined;
//     // return appReducer(undefined, action);
//   }
//   // console.log(state);
//   return appReducer(state, action);
// };

// export default rootReducer;
