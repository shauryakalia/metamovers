import React, { useEffect, useContext } from 'react';
import GithubContext from '../../context/metamovers/context';
import Loader from '../layout/Loader';
const innerHeight = window.innerHeight;
export const Home = () => {
  const githubContext = useContext(GithubContext);
  const { loading, getHomeInfo, homeInfo } = githubContext;
  useEffect(() => {
    getHomeInfo();
    //eslint-disable-next-line
  }, []);

  if (loading) return <Loader />;
  const { title, subtitle, videoUrl, features } = homeInfo;
  return (
    <div
      className="container-fluid homeCoverImg"
      style={{ height: innerHeight }}
    >
      <div className="row p-15-10">
        <div className="homeTitle">{title}</div>
        <div className="subTitle">{subtitle}</div>
      </div>
      <div className="row p-10 w-100 d-flex justify-content-center">
        <iframe
          className="video-content"
          width="90%"
          height={innerHeight - 102}
          title={title}
          src="https://www.youtube.com/embed/OknPSnXlnOY?autoplay=1&loop=1&playlist=OknPSnXlnOY&mute=1"
          frameborder="0"
          allow="accelerometer;fullscreen; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      </div>
      <div className="row p-5">
        <div className="card">
          <img alt="" className="card-img-top" src="..." />
          <div className="card-body">
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
