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

const videoUrls = [
  "https://res.cloudinary.com/metamovers/video/upload/v1639493914/metamovers/Lorenzo_Garcia_wkocpq.mp4",
  "https://res.cloudinary.com/metamovers/video/upload/v1639406346/metamovers/Jai_Khatri_y5xz7y.mp4",
  "https://res.cloudinary.com/metamovers/video/upload/v1639406343/metamovers/Camila_Diaz_gya0de.mp4",
  "https://res.cloudinary.com/metamovers/video/upload/v1639406329/metamovers/Adelola_Usman_qjey76.mp4",
  "https://res.cloudinary.com/metamovers/video/upload/v1639406327/metamovers/Alma_Cruz_axa8mg.mp4",
  "https://res.cloudinary.com/metamovers/video/upload/v1639406324/metamovers/Aroha_Kaiwai_xddvbo.mp4",
  "https://res.cloudinary.com/metamovers/video/upload/v1638622674/metamovers/Delroy_Brown_he3xky.mp4",
  "https://res.cloudinary.com/metamovers/video/upload/v1638622668/metamovers/Fang_Zhao_eecbif.mp4",
  "https://res.cloudinary.com/metamovers/video/upload/v1638622667/metamovers/Hamza_Adin_xjgl9i.mp4",
  "https://res.cloudinary.com/metamovers/video/upload/v1638622666/metamovers/Tevin_Jackson_kfef0o.mp4",
  "https://res.cloudinary.com/metamovers/video/upload/v1638622666/metamovers/Emily_Evans_V2_jcnjsl.mp4",
  "https://res.cloudinary.com/metamovers/video/upload/v1638622665/metamovers/Rin_Nakamura_dupqn7.mp4",
  "https://res.cloudinary.com/metamovers/video/upload/v1638622662/metamovers/Maria_Isabel_Ramos_xtmrx5.mp4",
  "https://res.cloudinary.com/metamovers/video/upload/v1638622659/metamovers/Claire_Fabian_apa7y1.mp4",
  "https://res.cloudinary.com/metamovers/video/upload/v1638622659/metamovers/Francis_Owusu_x1wbip.mp4",
  "https://res.cloudinary.com/metamovers/video/upload/v1638622659/metamovers/aqua_da_silva_1_jeunxg.mp4",
];

const GFaction = (props) => {
  const initialState = {
    homeInfo: {},
    teamInfo: {},
    metamoversInfo: { metamovers: videoUrls },
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
    // let res = await axios.get(`${hostName}/metamovers-section`);
    dispatch({ type: SET_META_INFO, payload: [] });
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
