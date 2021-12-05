import { SET_HOME_INFO, SET_LOADING } from "../Types";
export default (state, action) => {
  switch (action.type) {
    case SET_HOME_INFO:
      return { ...state, homeInfo: action.payload, loading: false };
    case SET_LOADING:
      return { ...state, loading: true };
    default:
      return state;
  }
};
