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
    ourStoryInfo: [],
    metamoversInfo: { metamovers: videoUrls },
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
    setloading();
    // let res = await axios.get(`${hostName}/metamovers-section`);
    dispatch({ type: SET_META_INFO, payload: [] });
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
          content:
            'Hey guys! It’s Dylan Mayoral here, founder and director of Metamovers. I wanted to share a bit of my story with you all and how we got here. Since 2016, I have been organizing dance events for my home town London, UK. I started to do this because I truly love my community and know we have something special here. I also wanted to bring teachers from other countries to share their knowledge and energy with our community. ',
          mediaUrl:
            'https://res.cloudinary.com/metamovers/image/upload/v1642610567/ourStory/DSC-8331_cirqio.jpg',
          nftUrl: null,
          mediaType: 'image',
        },
        {
          content:
            'In 2018 I started ‘Mayoral Training Program’, a dance event that provides elite training and education to its participants. Our slogan is ‘for the community, for the culture’ and that will remain true till the end of time. Here you can see our 2019 edition recap where we saw students from 30 different countries worldwide fly into London to train with us. We organized an 8 Day dance event with classes, a battle, a showcase and a day of gymnastics.',
          mediaUrl:
            'https://res.cloudinary.com/metamovers/video/upload/v1642610834/ourStory/Y2Mate.is_-_Mayoral_Training_Program_London_2019_Recap-DyOQY2hzkQw-1080p-1641637749666_xfebtf.mp4',
          thumbnail:
            'https://res.cloudinary.com/metamovers/image/upload/v1642782660/ourStory/Screenshot_2022-01-21_at_10.00.29_PM_iart2j.png',
          nftUrl: null,
        },
        {
          content:
            'In February 2021 I discovered NFTs. A month later I minted my first NFT, becoming one of the first professional Dancers to mint a Dance NFT.',
          mediaUrl:
            'https://res.cloudinary.com/metamovers/video/upload/v1642610594/ourStory/Alpha_NFT_v2ou7e.mp4',
          thumbnail:
            'https://res.cloudinary.com/metamovers/image/upload/v1642782690/ourStory/Screenshot_2022-01-21_at_10.01.17_PM_pud2bs.png',
          nftUrl:
            'https://opensea.io/assets/0x495f947276749ce646f68ac8c248420045cb7b5e/90908400263571703802180284216207287151538192655145282985747433922489246285825',
        },
        {
          content:
            'A few months later, I started to mint Dance NFTs with music, since then I have sold over 16 Eth worth of Dance NFTs (as of 19th January 2022).',
          mediaUrl:
            'https://res.cloudinary.com/metamovers/video/upload/v1642610627/ourStory/To_be_an_artist_Dance_NFT_kqn4ax.mp4',
          thumbnail:
            'https://res.cloudinary.com/metamovers/image/upload/v1642782768/ourStory/Screenshot_2022-01-21_at_10.02.43_PM_yylnzj.png',
          nftUrl: 'https://foundation.app/@DylanMayoral/~/59555',
        },
        {
          content: `Around the same time, (June 2021) I began to work on Metamovers with my incredible team. I’ve been a performer my whole life and I have great experience in organizing events with the incredible connections I have in the global dance industry. I love technology, am crazy passionate about NFTs and Web3 so I thought.. Maybe there’s a way to combine all of this together. 

            And there is. The vision is very clear to me. I want to create a yearly Dance show where every performance is minted on the blockchain, thus immortalizing the art/performance. I want to open a dance studio in London that will support the London community and also use the space to create Dance NFTs with the best the UK has to offer. I want to create a Metaverse Dance Agency that empowers Dancers using blockchain technology. I want to be here building till the day I die.
            
            In this section, you’ll see a video of me performing in Canada. Now what if you could own this performance, this moment in time. What if there was a show that produced countless epic moments like these and minted them on the blockchain for the community to own and trade, allowing the creators to monetise their art (dance) in a way that was unimaginable just a few years ago. 

            `,
          endTitle: ' That is Metamovers ! ',
          mediaUrl:
            'https://res.cloudinary.com/metamovers/video/upload/v1642610771/ourStory/Judge_Showcase_Dylan_Mayoral_-_The_Release_Dance_Competition_2019_l7ygjo.mp4',
          thumbnail:
            'https://res.cloudinary.com/metamovers/image/upload/v1642782855/ourStory/Screenshot_2022-01-21_at_10.04.10_PM_vgxhxi.png',
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
