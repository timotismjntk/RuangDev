/* eslint-disable prettier/prettier */
const initialState = {
    data: [],
    isLoading: false,
    isError: false,
    alertMsg: '',
    pageInfo: {},
  };

  export default (state = initialState, action) => {
    switch (action.type) {
      case 'GET_ARTICLES_PENDING': {
        return {
          ...state,
          isLoading: true,
        };
      }
      case 'GET_ARTICLES_REJECTED': {
        return {
          ...state,
          isLoading: false,
          isError: true,
          alertMsg: 'There is an error at request data',
        };
      }
      case 'GET_ARTICLES_FULFILLED': {
        return {
          ...state,
          isLoading: false,
          data: action.payload.data.results,
          pageInfo: action.payload.data.pageInfo,
        };
      }
      case 'LOGOUT_USER': {
        return {
          data: [],
          isLoading: false,
          isError: false,
          alertMsg: '',
          pageInfo: {},
        };
      }
      default: {
        return state;
      }
    }
  };
