const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  alertMsg: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'AUTHOR_ARTICLES_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'AUTHOR_ARTICLES_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: 'There is an error at request data',
      };
    }
    case 'AUTHOR_ARTICLES_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        data: action.payload.data.results,
      };
    }
    case 'LOGOUT_USER': {
      return {
        data: [],
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
