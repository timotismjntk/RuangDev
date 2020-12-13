const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  alertMsg: '',
  isSuccess: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_COMMENT_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'GET_COMMENT_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: 'There is an error at request data',
      };
    }
    case 'GET_COMMENT_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        data: action.payload.data.results,
      };
    }
    case 'POST_COMMENT_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'POST_COMMENT_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        alertMsg: action.payload.data.error,
      };
    }
    case 'POST_COMMENT_FULFILLED': {
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
    case 'LOGOUT_USER': {
      return {
        data: [],
        isLoading: false,
        isError: false,
        alertMsg: '',
        isSuccess: false,
      };
    }
    default: {
      return state;
    }
  }
};
