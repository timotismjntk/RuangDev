/* eslint-disable prettier/prettier */
const initialState = {
    data: {},
    isLoading: false,
    isError: false,
    alertMsg: '',
  };

  export default (state = initialState, action) => {
    switch (action.type) {
      case 'GET_DETAIL_ARTICLE_PENDING': {
        return {
          ...state,
          isLoading: true,
        };
      }
      case 'GET_DETAIL_ARTICLE_REJECTED': {
        return {
          ...state,
          isLoading: false,
          isError: true,
          alertMsg: 'There is an error at request data',
        };
      }
      case 'GET_DETAIL_ARTICLE_FULFILLED': {
        return {
          ...state,
          isLoading: false,
          data: action.payload.data.results,
        };
      }
      case 'LOGOUT_USER': {
        return {
          data: {},
          isLoading: false,
          isError: false,
          alertMsg: '',
        };
      }
      default: {
        return state;
      }
    }
  };
