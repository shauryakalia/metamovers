import {
  SET_HOME_INFO,
  SET_LOADING,
  SET_TEAM_INFO,
  SET_META_INFO,
  SET_ROADMAP_INFO,
  SET_FOOTER_INFO,
  SET_CONNECTION_STATUS,
  SET_MINT_STATUS,
  SET_MINT_LOADING,
  SET_WALLET_LOADING,
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
    case SET_CONNECTION_STATUS:
      return {
        ...state,
        connectionStatus: action.payload,
        walletLoading: false,
      };
    case SET_MINT_STATUS:
      return { ...state, mintStatus: action.payload, mintLoading: false };
    case SET_LOADING:
      return { ...state, loading: true };
    case SET_WALLET_LOADING:
      return { ...state, walletLoading: true };
    case SET_MINT_LOADING:
      return { ...state, mintLoading: true };
    default:
      return state;
  }
};
