const initialState = {
  isLogin: false,
  isError: false,
  token: '',
  alertMsg: '',
  isSuccess: false,
  isLoading: false,
  isExpired: false,
  isLoadingExpired: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SIGNUP_USER_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'SIGNUP_USER_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: true,
        alertMsg: action.payload.response.data.error,
      };
    }
    case 'SIGNUP_USER_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isError: false,
        alertMsg: 'Signup Successfully',
      };
    }
    case 'AUTH_USER_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'AUTH_USER_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: action.payload.response.data.error,
      };
    }
    case 'AUTH_USER_FULFILLED': {
      // console.log(action.payload.data.message);
      // localStorage.setItem('token', action.payload.data.message);
      return {
        ...state,
        token: action.payload.data.token,
        isLoading: false,
        isLogin: true,
        alertMsg: 'Successfully login',
      };
    }
    case 'CHECK_REFRESH_TOKEN_PENDING': {
      return {
        ...state,
        isExpired: false,
        isLoadingExpired: true,
      };
    }
    case 'CHECK_REFRESH_TOKEN_REJECTED': {
      return {
        ...state,
        isExpired: true,
        isLoadingExpired: false,
        isLogin: false,
        alertMsg: action.payload.response.data.error,
      };
    }
    case 'CHECK_REFRESH_TOKEN_FULFILLED': {
      return {
        ...state,
        isExpired: false,
        isLoadingExpired: false,
        alertMsg: action.payload.data.message,
      };
    }
    case 'persist/REHYDRATED': {
      return {
        ...state,
        token: action.payload,
        isLogin: true,
      };
    }
    case 'LOGOUT_USER': {
      return {
        isLogin: false,
        token: '',
        isError: false,
        alertMsg: 'Logout Successfully',
        isSuccess: false,
        isLoading: false,
      };
    }
    case 'CLEAR_MESSAGE': {
      return {
        ...state,
        isError: false,
        alertMsg: '',
        isSuccess: false,
        isLoading: false,
      };
    }
    default: {
      return state;
    }
  }
};
