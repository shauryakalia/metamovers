import React, { useReducer } from 'react';
import axios from 'axios';
import GFcontext from './context';
import GFreducer from './reducer';
import {
  SET_HOME_INFO,
  SET_LOADING,
  SET_WALLET_LOADING,
  SET_MINT_LOADING,
  SET_TEAM_INFO,
  SET_META_INFO,
  SET_ROADMAP_INFO,
  SET_FOOTER_INFO,
  SET_CONNECTION_STATUS,
  SET_MINT_STATUS,
  SET_OUR_STORY_INFO,
} from '../Types';

const GFaction = (props) => {
  const initialState = {
    homeInfo: {},
    teamInfo: {},
    ourStoryInfo: [],
    metamoversInfo: {},
    roadMapInfo: {},
    footerInfo: {},
    loading: false,
    walletLoading: false,
    mintLoading: false,
    connectionStatus: false,
    mintStatus: false,
  };

  const [state, dispatch] = useReducer(GFreducer, initialState);
  const hostName = 'https://metamovers.herokuapp.com';

  async function getHomeInfo() {
    setloading();
    let res = await axios.get(`${hostName}/home`);
    dispatch({ type: SET_HOME_INFO, payload: res.data });
  }

  async function getTeamInfo() {
    let res = await axios.get(`${hostName}/team-section`);
    dispatch({ type: SET_TEAM_INFO, payload: res.data });
  }

  async function getMetamoversInfo() {
    let res = await axios.get(`${hostName}/metamovers-section`);
    dispatch({ type: SET_META_INFO, payload: res.data });
  }

  async function getRoadMapInfo() {
    let res = await axios.get(`${hostName}/roadmap-section`);
    dispatch({ type: SET_ROADMAP_INFO, payload: res.data });
  }

  async function getFooterInfo() {
    let res = await axios.get(`${hostName}/footer`);
    dispatch({ type: SET_FOOTER_INFO, payload: res.data });
  }

  async function getOurStoryInfo() {
    // let res = await axios.get(`${hostName}/our-story`);
    dispatch({
      type: SET_OUR_STORY_INFO,
      payload: [
        {
          title: 'In Begining',
          content:
            'Hey guys! It’s Dylan Mayoral here, founder and director of Metamovers. I wanted to share a bit of my story with you all and how we got here Since 2016, I have been organizing dance events for my home town London, UK. I started to do this because I truly love my community and know we have something special here. I also wanted to bring teachers from other countries to share their knowledge and energy with our community. ',
          mediaUrl:
            'https://res.cloudinary.com/metamovers/image/upload/v1642610567/ourStory/DSC-8331_cirqio.jpg',
          nftUrl: null,
        },
        {
          title: 'In Begining',
          content:
            'Hey guys! It’s Dylan Mayoral here, founder and director of Metamovers. I wanted to share a bit of my story with you all and how we got here Since 2016, I have been organizing dance events for my home town London, UK. I started to do this because I truly love my community and know we have something special here. I also wanted to bring teachers from other countries to share their knowledge and energy with our community. ',
          mediaUrl:
            'https://res.cloudinary.com/metamovers/image/upload/v1642610567/ourStory/DSC-8331_cirqio.jpg',
          nftUrl: null,
        },
      ],
    });
  }

  async function getConnectionStatus(status) {
    setWalletLoading();
    if (status) {
      dispatch({ type: SET_CONNECTION_STATUS, payload: status });
    } else {
      dispatch({ type: SET_CONNECTION_STATUS, payload: 'success' });
    }
  }

  async function getMintStatus(status) {
    setMintLoading();
    if (status === false) {
      dispatch({ type: SET_MINT_STATUS, payload: status });
    } else {
      dispatch({ type: SET_MINT_STATUS, payload: 'pending' });
    }
  }

  const setloading = () => dispatch({ type: SET_LOADING });
  const setWalletLoading = () => dispatch({ type: SET_WALLET_LOADING });
  const setMintLoading = () => dispatch({ type: SET_MINT_LOADING });

  return (
    <GFcontext.Provider
      value={{
        homeInfo: state.homeInfo,
        teamInfo: state.teamInfo,
        metamoversInfo: state.metamoversInfo,
        roadMapInfo: state.roadMapInfo,
        footerInfo: state.footerInfo,
        loading: state.loading,
        connectionStatus: state.connectionStatus,
        mintStatus: state.mintStatus,
        walletLoading: state.walletLoading,
        mintLoading: state.mintLoading,
        ourStoryInfo: state.ourStoryInfo,
        getHomeInfo,
        getTeamInfo,
        getMetamoversInfo,
        getRoadMapInfo,
        getFooterInfo,
        getConnectionStatus,
        getMintStatus,
        getOurStoryInfo,
      }}
    >
      {props.children}
    </GFcontext.Provider>
  );
};

export default GFaction;
