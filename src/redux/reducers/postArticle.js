const initialState = {
  isLoading: false,
  isError: false,
  alertMsg: '',
  isSuccess: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'POST_ARTICLE_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'POST_ARTICLE_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        alertMsg: action.payload.data.error,
      };
    }
    case 'POST_ARTICLE_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        alertMsg: action.payload.data.message,
      };
    }
    case 'CLEAR_MESSAGE': {
      return {
        ...state,
        alertMsg: '',
        isError: false,
        isLoading: false,
        isSuccess: false,
      };
    }
    default: {
      return state;
    }
  }
};
