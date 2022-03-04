import * as cx from 'redux/modules/account/constants';

const initialState = {
  errors: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case cx.FORM_STATUS: {
      const {errors} = action.payload;

      return {...state, errors};
    }
    default:
      return state;
  }
};

export default reducer;
