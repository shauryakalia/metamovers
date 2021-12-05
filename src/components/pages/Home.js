import React, { useEffect, useContext } from 'react';
import GithubContext from '../../context/metamovers/context';
import Loader from '../layout/Loader';

export const Home = () => {
  const githubContext = useContext(GithubContext);
  const { loading, getHomeInfo, homeInfo } = githubContext;
  useEffect(() => {
    getHomeInfo();
    //eslint-disable-next-line
  }, []);

  if (loading) return <Loader />;
  const { id, title, subtitle, videoUrl, logo, gradient, features } = homeInfo;
  return (
    <div className="container-fluid m-5 p-5">
      <div className="row">
        <h2>{title}</h2>
      </div>
    </div>
  );
};
export default Home;
