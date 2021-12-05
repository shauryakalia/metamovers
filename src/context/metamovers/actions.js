import React, { useReducer } from 'react';
import axios from 'axios';
import GFcontext from './context';
import GFreducer from './reducer';
import {
  SET_HOME_INFO,
  SET_LOADING,
  SET_TEAM_INFO,
  SET_META_INFO,
  SET_ROADMAP_INFO,
  SET_FOOTER_INFO,
} from '../Types';

const GFaction = (props) => {
  const initialState = {
    homeInfo: {},
    teamInfo: {},
    metamoversInfo: {},
    roadMapInfo: {},
    footerInfo: {},
    loading: false,
  };

  const [state, dispatch] = useReducer(GFreducer, initialState);
  const hostName = 'https://metamovers.herokuapp.com';

  async function getHomeInfo() {
    setloading();
    let res = await axios.get(`${hostName}/home`);
    dispatch({ type: SET_HOME_INFO, payload: res.data });
  }

  async function getTeamInfo() {
    setloading();
    let res = await axios.get(`${hostName}/team-section`);
    dispatch({ type: SET_TEAM_INFO, payload: res.data });
  }

  async function getMetamoversInfo() {
    setloading();
    let res = await axios.get(`${hostName}/metamovers-section`);
    dispatch({ type: SET_META_INFO, payload: res.data });
  }

  async function getRoadMapInfo() {
    setloading();
    let res = await axios.get(`${hostName}/roadmap-section`);
    dispatch({ type: SET_ROADMAP_INFO, payload: res.data });
  }

  async function getFooterInfo() {
    setloading();
    let res = await axios.get(`${hostName}/footer`);
    dispatch({ type: SET_FOOTER_INFO, payload: res.data });
  }

  const setloading = () => dispatch({ type: SET_LOADING });

  return (
    <GFcontext.Provider
      value={{
        homeInfo: state.homeInfo,
        teamInfo: state.teamInfo,
        metamoversInfo: state.metamoversInfo,
        roadMapInfo: state.roadMapInfo,
        footerInfo: state.footerInfo,
        loading: state.loading,
        getHomeInfo,
        getTeamInfo,
        getMetamoversInfo,
        getRoadMapInfo,
        getFooterInfo,
      }}
    >
      {props.children}
    </GFcontext.Provider>
  );
};

export default GFaction;
