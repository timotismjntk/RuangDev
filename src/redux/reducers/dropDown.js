const initialState = {
  sortby: 'Newest',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'DROPDOWN': {
      return {
        ...state,
        sortby: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
