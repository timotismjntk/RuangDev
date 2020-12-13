const initialState = {
  isLoading: false,
  isError: false,
  alertMsg: '',
  isSuccess: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'POST_LIKES_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'POST_LIKES_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        alertMsg: action.payload.data.error,
      };
    }
    case 'POST_LIKES_FULFILLED': {
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
