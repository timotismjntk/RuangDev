/* eslint-disable prettier/prettier */
const initialState = {
    isLogin: false,
    isError: false,
    token: '',
    alertMsg: '',
  };

  export default (state = initialState, action) => {
    switch (action.type) {
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
      case 'persist/REHYDRATED': {
        return {
          ...state,
          token: action.payload,
          isLogin: true,
        };
      }
      case 'LOGOUT_USER': {
        //   localStorage.removeItem('token');
        return {
          isLogin: false,
          token: '',
          isError: false,
          alertMsg: 'Logout Successfully',
        };
      }
      case 'CLEAR_MESSAGE': {
        return {
          ...state,
          alertMsg: '',
        };
      }
      default: {
        return state;
      }
    }
  };
