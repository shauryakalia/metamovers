import React, { useReducer } from "react";
import axios from "axios";
import GFcontext from "./context";
import GFreducer from "./reducer";
import { GET_USERS, GET_PROFILE, SET_LOADING } from "../Types";

let githubclientid, githubclientsecret;
if (process.env.NODE_ENV != "production") {
  githubclientid = process.env.REACT_APP_MY_NAME_IN_PRO;
} else {
  githubclientid = process.env.REACT_APP_MY_NAME;
}

const GFaction = props => {
  const initialState = {
    users: [],
    userProfile: {},
    loading: false
  };
  const [state, dispatch] = useReducer(GFreducer, initialState);

  async function fethusers() {
    setloading();
    let res = await axios.get(`https://api.github.com/users`);
    dispatch({ type: GET_USERS, payload: res.data });
  }

  const searchUsers = async text => {
    setloading();
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}`
    );
    dispatch({ type: GET_USERS, payload: res.data.items });
  };

  const getUserProfile = async username => {
    setloading();
    const res = await axios.get(
      `https://api.github.com/search/users?q=${
        username.indexOf(":") > -1 ? username.replace(":", "") : username
      }`
    );
    dispatch({ type: GET_PROFILE, payload: res.data.items[0] });
  };

  const setloading = () => dispatch({ type: SET_LOADING });
  return (
    <GFcontext.Provider
      value={{
        users: state.users,
        userProfile: state.userProfile,
        loading: state.loading,
        searchUsers,
        fethusers,
        getUserProfile
      }}
    >
      {props.children}
    </GFcontext.Provider>
  );
};

export default GFaction;
