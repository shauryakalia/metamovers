import React, { useReducer } from 'react';
import axios from 'axios';
import GFcontext from './context';
import GFreducer from './reducer';
import { SET_HOME_INFO, SET_LOADING } from '../Types';

const GFaction = (props) => {
  const initialState = {
    homeInfo: {},
    loading: false,
  };

  const [state, dispatch] = useReducer(GFreducer, initialState);
  const hostName = 'https://metamovers.herokuapp.com';

  async function getHomeInfo() {
    setloading();
    let res = await axios.get(`${hostName}/home`);
    dispatch({ type: SET_HOME_INFO, payload: res.data });
  }

  const setloading = () => dispatch({ type: SET_LOADING });

  return (
    <GFcontext.Provider
      value={{
        homeInfo: state.homeInfo,
        getHomeInfo,
        loading: state.loading,
      }}
    >
      {props.children}
    </GFcontext.Provider>
  );
};

export default GFaction;
