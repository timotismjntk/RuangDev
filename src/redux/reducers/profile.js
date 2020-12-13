/* eslint-disable prettier/prettier */
const initialState = {
    data: {},
    isLoading: false,
    isError: false,
    alertMsg: '',
    updated: false,
    isLoadingUpdate: false,
    isUploaded: false,
    isDeleted: false,
    isLoadingReset: false,
    isReset: false,
    isErrorReset: false,
    alertMsgReset: '',
  };

  export default (state = initialState, action) => {
    switch (action.type) {
      case 'GET_PROFILE_PENDING': {
        return {
          ...state,
          isLoading: true,
        };
      }
      case 'GET_PROFILE_REJECTED': {
        return {
          ...state,
          isLoading: false,
          isError: true,
          alertMsg: 'There is an error at request data',
        };
      }
      case 'GET_PROFILE_FULFILLED': {
        return {
          ...state,
          isLoading: false,
          data: action.payload.data,
        };
      }
      case 'PATCH_PROFILE_PENDING': {
        return {
          ...state,
          isLoading: true,
        };
      }
      case 'PATCH_PROFILE_REJECTED': {
        return {
          ...state,
          isLoading: false,
          isError: true,
          alertMsg: 'There is an error at request data',
        };
      }
      case 'PATCH_PROFILE_FULFILLED': {
        return {
          ...state,
          isLoading: false,
          alertMsg: 'Profile updated',
          updated: true,
        };
      }
      case 'UPDATE_PASSWORD_PENDING': {
        return {
          ...state,
          isLoading: true,
        };
      }
      case 'UPDATE_PASSWORD_REJECTED': {
        return {
          ...state,
          isLoading: false,
          isError: true,
          updated: false,
          alertMsg: 'There is an error at request data',
        };
      }
      case 'UPDATE_PASSWORD_FULFILLED': {
        console.log(action.payload);
        return {
          ...state,
          isLoading: false,
          alertMsg: 'Profile updated',
          isError: false,
          updated: true,
        };
      }
      case 'PATCH_PROFILE_IMAGE_PENDING': {
        return {
          ...state,
          isLoading: true,
        };
      }
      case 'PATCH_PROFILE_IMAGE_REJECTED': {
        return {
          ...state,
          isLoading: false,
          isError: true,
          alertMsg: 'There is an error at request data',
        };
      }
      case 'PATCH_PROFILE_IMAGE_FULFILLED': {
        return {
          ...state,
          isLoading: false,
          alertMsg: 'Image updated',
          isUploaded: true,
        };
      }
      case 'DELETE_PROFILE_PENDING': {
        return {
          ...state,
          isLoading: true,
        };
      }
      case 'DELETE_PROFILE_REJECTED': {
        return {
          ...state,
          isLoading: false,
          isError: true,
          isDeleted: false,
          alertMsg: action.payload.response.data.error,
        };
      }
      case 'DELETE_PROFILE_FULFILLED': {
        return {
          ...state,
          isLoading: false,
          isError: false,
          alertMsg: action.payload.data.message,
          isDeleted: true,
          updated: true,
        };
      }
      case 'RESET_PASSWORD_PENDING': {
        return {
          ...state,
          isLoadingReset: false,
          isReset: false,
          isErrorReset: false,
        };
      }
      case 'RESET_PASSWORD_REJECTED': {
        return {
          ...state,
          isLoadingReset: false,
          isErrorReset: true,
          isReset: false,
          alertMsgReset: action.payload.response.data.error,
        };
      }
      case 'RESET_PASSWORD_FULFILLED': {
        return {
          ...state,
          isLoadingReset: false,
          isErrorReset: true,
          isReset: true,
          alertMsgReset: action.payload.data.message,
        };
      }
      case 'REMOVE_MESSAGE': {
        return {
          ...state,
          isLoading: false,
          updated: false,
          alertMsg: '',
          isUploaded: false,
          isLoadingReset: false,
          isErrorReset: false,
          isReset: false,
          alertMsgReset: '',
        };
      }
      case 'LOGOUT_USER': {
        return {
          data: {},
          isLoading: false,
          isError: false,
          alertMsg: '',
          updated: false,
          isLoadingUpdate: false,
          isUploaded: false,
          isDeleted: false,
          isLoadingReset: false,
          isReset: false,
          isErrorReset: false,
          alertMsgReset: '',
        };
      }
      default: {
        return state;
      }
    }
  };
