import {
  SET_HOME_INFO,
  SET_LOADING,
  SET_TEAM_INFO,
  SET_META_INFO,
  SET_ROADMAP_INFO,
  SET_FOOTER_INFO,
} from '../Types';
export default (state, action) => {
  switch (action.type) {
    case SET_HOME_INFO:
      return { ...state, homeInfo: action.payload, loading: false };
    case SET_TEAM_INFO:
      return { ...state, teamInfo: action.payload, loading: false };
    case SET_META_INFO:
      return { ...state, metamoversInfo: action.payload, loading: false };
    case SET_ROADMAP_INFO:
      return { ...state, roadMapInfo: action.payload, loading: false };
    case SET_FOOTER_INFO:
      return { ...state, footerInfo: action.payload, loading: false };
    case SET_LOADING:
      return { ...state, loading: true };
    default:
      return state;
  }
};
