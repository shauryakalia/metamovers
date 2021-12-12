/* eslint-disable no-unused-vars */
import React, { useEffect, useContext, useState } from 'react';
import GithubContext from '../../context/metamovers/context';
import Loader from '../layout/Loader';
import Footer from '../layout/Footer';
import metaGif from '../../imgs/Delroy_Brown.gif';
import dg1 from '../../imgs/1.png';
import dg2 from '../../imgs/2.png';
import dg3 from '../../imgs/3.png';
import dg4 from '../../imgs/4.png';
import dg5 from '../../imgs/5.png';
import dg6 from '../../imgs/6.png';
import dg7 from '../../imgs/7.png';
import dg8 from '../../imgs/8.png';
import dg9 from '../../imgs/9.png';
import dg10 from '../../imgs/10.png';
import dg11 from '../../imgs/11.png';

const innerHeight = window.innerHeight;
export const Home = () => {
  const githubContext = useContext(GithubContext);
  const [memberInfo, setMemberInfo] = useState('');
  const [videoInfo, setVideoInfo] = useState('');
  const [dgImageSrc, setDgImageSrc] = useState(dg1);
  const {
    loading,
    getHomeInfo,
    homeInfo,
    teamInfo,
    metamoversInfo,
    getTeamInfo,
    getMetamoversInfo,
    footerInfo,
    getFooterInfo,
    roadMapInfo,
    getRoadMapInfo,
  } = githubContext;
  useEffect(() => {
    getHomeInfo();
    getTeamInfo();
    getMetamoversInfo();
    getFooterInfo();
    getRoadMapInfo();
    document.addEventListener('click', closeModalOnClickOutside);
    //eslint-disable-next-line
  }, []);

  if (loading) return <Loader />;
  const { title, subtitle, videoUrl: mainVideoURL, features = [] } = homeInfo;
  const { title: teamTitle, team = [] } = teamInfo;
  const {
    title: metaTitle,
    subtitle: metaSubTitle,
    metamovers = [],
  } = metamoversInfo;
  const setMemberInfoFn = (bio) => {
    setMemberInfo(bio);
  };
  const chunkSize = 4;
  const chunkMetamovers = [];

  for (let i = 0; i < metamovers.length; i += chunkSize) {
    chunkMetamovers.push(metamovers.slice(i, chunkSize + i));
  }

  const { title: roadMapInfoTitle, roadmap = [] } = roadMapInfo;

  const closeModalOnClickOutside = () => {
    const memberInfoModal = document.getElementById('memberInfoModal');
    const videoInfoModal = document.getElementById('videoInfoModal');
    window.onclick = function (event) {
      if (event.target === memberInfoModal) {
        setMemberInfo('');
      }

      if (event.target === videoInfoModal) {
        setVideoInfo('');
      }
    };
  };

  const keySocialMap = {
    instagram: 'instagram',
    behance: 'behance',
    facebook: 'facebook',
    youtube: 'youtube',
    twitter: 'twitter',
    spotify: 'spotify',
    soundcloud: 'soundcloud',
    tiktok: 'youtube',
    youtubesecond: 'youtube',
  };

  const animateTimeline = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    let scrolled = winScroll;
    if (scrolled > 3000) scrolled = scrolled - 3000;
    else scrolled = scrolled - 2000;

    scrolled = (scrolled / 10) * 1.5;

    let dgSrc = dg1;
    if (scrolled > 1 && scrolled <= 10) dgSrc = dg1;
    if (scrolled > 10 && scrolled <= 20) dgSrc = dg2;
    if (scrolled > 20 && scrolled <= 30) dgSrc = dg3;
    if (scrolled > 30 && scrolled <= 40) dgSrc = dg4;
    if (scrolled > 40 && scrolled <= 50) dgSrc = dg5;
    if (scrolled > 50 && scrolled <= 60) dgSrc = dg6;
    if (scrolled > 60 && scrolled <= 70) dgSrc = dg7;
    if (scrolled > 70 && scrolled <= 80) dgSrc = dg8;
    if (scrolled > 80 && scrolled <= 90) dgSrc = dg9;
    if (scrolled > 90 && scrolled <= 100) dgSrc = dg10;
    if (scrolled > 100) dgSrc = dg11;
    setDgImageSrc(dgSrc);

    if (scrolled > 100) scrolled = 100;
    document.getElementById('myTimelineBar').style.height = scrolled + '%';
  };

  return (
    <>
      <div
        id="memberInfoModal"
        className={`modal ${memberInfo ? 'd-block' : 'd-none'}`}
      >
        <div className="modal-content">
          <div className="modal-header">
            <span
              onClick={() => setMemberInfo(null)}
              className="close text-dark"
            >
              &times;
            </span>
          </div>
          <div
            className="modal-body p-2"
            style={{ overflow: 'auto', overflowX: 'hidden' }}
          >
            <div className="row">
              <div className="col-md-4 text-center">
                <img
                  alt=""
                  className="card-img-top meetTheTeamImg shadow-sm mx-auto"
                  src={memberInfo && memberInfo.avatar}
                />
              </div>
              <div className="col-md-6 text-left">
                <p className="card-text h4 font-weight-bolder mb-1">
                  {memberInfo && memberInfo.name}
                </p>
                <p className="card-text h5">{memberInfo && memberInfo.title}</p>
                <p className="card-text h6 p-0 d-flex justify-content-start">
                  {memberInfo &&
                    Object.entries(memberInfo && memberInfo.social).map(
                      ([key, value]) => {
                        return value && key !== 'id' ? (
                          <span
                            className="socialBtn"
                            key={key}
                            onClick={() => window.open(value)}
                          >
                            <i className={`fab fa-${key}`}></i>
                          </span>
                        ) : null;
                      }
                    )}
                </p>
              </div>
            </div>
            <div>
              <p className="card-text h6 p-3 overflow-auto">
                {memberInfo && memberInfo.bio}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        id="videoInfoModal"
        className={`modal ${videoInfo ? 'd-block' : 'd-none'}`}
      >
        <div className="modal-content metamoversVideoModal">
          <div className="modal-header">
            <span
              onClick={() => setVideoInfo(null)}
              className="close text-dark"
            >
              &times;
            </span>
          </div>
          <div className="modal-body p-2">
            <video className="metaMoversVideo" src={videoInfo} controls></video>
          </div>
        </div>
      </div>

      <div
        className="container-fluid homeCoverImg"
        style={{ height: innerHeight }}
      >
        <div
          id="aboutSection"
          className="row d-flex justify-content-center pt-5"
        >
          <div className="homeTitle pt-5">{title}</div>
          <div className="subTitle">{subtitle}</div>
        </div>
        <div className="row p-10 w-100 d-flex justify-content-center">
          {mainVideoURL ? (
            <iframe
              className="shadow-lg"
              width="90%"
              height={innerHeight - 102}
              title={title}
              src={`https://www.youtube.com/embed/${
                mainVideoURL.split('=')[1]
              }`}
              frameborder="0"
              allow="accelerometer;fullscreen; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          ) : null}
        </div>
        <div className="row pl-5 pr-5 pt-0 pb-5 d-flex justify-content-center featureSection">
          {features.map(({ title, subtitle, iconUrl }) => (
            <div className="card animate-border service-card m-3">
              <img
                alt=""
                className="card-img-top metamoversImg shadow-sm mx-auto"
                src={iconUrl}
              />
              <div className="card-body">
                <p className="card-text h5 font-weight-bolder mb-3 serviceText">
                  {title}
                </p>
                <hr />
                <p className="card-text h6 text-grey serviceSubText">
                  {subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div
          id="metamoversSection"
          className="row metamoversSectionBg mb-5  text-white d-flex justify-content-center"
        >
          <section className="pt-5 pb-5 pl-5 pr-5 pt-0 pb-5">
            <div className="container">
              <div className="row">
                <div className="col-10">
                  <h1 className="mb-2 font-weight-bold">{metaTitle}</h1>
                  <h6 className="mb-2 metamoversSubTitle">{metaSubTitle}</h6>
                </div>
                <div className="col-2 text-right">
                  <a
                    className="btn btn-light text-primary mb-3 mr-1"
                    href="#carouselExampleIndicators2"
                    role="button"
                    data-slide="prev"
                  >
                    <i className="fa fa-arrow-left"></i>
                  </a>
                  <a
                    className="btn btn-light text-primary mb-3 "
                    href="#carouselExampleIndicators2"
                    role="button"
                    data-slide="next"
                  >
                    <i className="fa fa-arrow-right"></i>
                  </a>
                </div>
                <div className="col-12 mt-3">
                  <div
                    id="carouselExampleIndicators2"
                    className="carousel slide"
                    data-ride="carousel"
                  >
                    <div className="carousel-inner">
                      {chunkMetamovers.map((childChunk, idx) => {
                        const currentItems = childChunk.map((child2) => (
                          <div className="col-md-3 mb-3 mt-3">
                            <div className="card shadow-lg border-0 text-dark rounded">
                              <img
                                className="card-img-top metamoversVideo"
                                src={
                                  child2.gifUrl ? `${child2.gifUrl}` : metaGif
                                }
                                alt={`${child2.name}`}
                                onClick={() => setVideoInfo(child2.videourl)}
                              />
                            </div>
                          </div>
                        ));
                        return (
                          <div
                            className={`carousel-item ${
                              idx === 0 ? 'active' : ''
                            }`}
                          >
                            <div className="row">{currentItems}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div
          id="roadMapSection"
          className="mb-5 overflowScroll roadMapSectionStyle"
          onWheelCapture={animateTimeline}
        >
          <div className="row d-flex justify-content-center mb-5">
            <h1 className="font-weight-bold border-bottom-1">
              {roadMapInfoTitle}
            </h1>
          </div>
          <br />
          <div className="row pl-5 pr-5 pt-0 pb-5 d-flex justify-content-center">
            <div className="col-md-6">
              <div class="header">
                <div class="progress-container">
                  <div class="custom-progress-bar" id="myTimelineBar"></div>
                </div>
              </div>
              <section className="timeline">
                <ol>
                  {roadmap.map((childRoadMap) => (
                    <li key={childRoadMap.sno}>
                      <span className="timeline-point font-weight-bold"></span>
                      <span className="date font-weight-bold">
                        {childRoadMap.title}
                      </span>
                      <p>{childRoadMap.subtitle}</p>
                    </li>
                  ))}
                </ol>
              </section>
            </div>
            <div className="col-md-6 dancingGirlSectionBg">
              <img alt="" className="dgImage" src={dgImageSrc} />
            </div>
          </div>
        </div>
        <div id="theTeamSection" className="meetTheTeamSection">
          <div className="row d-flex justify-content-center mb-5">
            <h1 className="font-weight-bold border-bottom-1">{teamTitle}</h1>
          </div>
          <div className="row pl-5 pr-5 pt-0 pb-5 d-flex justify-content-center">
            {team.map(({ name, title, bio, avatar, social }) => (
              <div className="card teamInfoBox shadow-sm m-3">
                <img
                  alt=""
                  className="card-img-top meetTheTeamImg shadow-sm mx-auto"
                  src={avatar}
                />
                <div className="card-body">
                  <p className="card-text h4 font-weight-bolder mb-1">{name}</p>
                  <p className="card-text h5 mb-3">{title}</p>
                  <hr />
                  <p className="card-text h6 d-flex justify-content-center">
                    {Object.entries(social).map(([key, value]) => {
                      console.log(key);

                      return value && key !== 'id' ? (
                        <span
                          className="socialBtn"
                          key={key}
                          onClick={() => window.open(value)}
                        >
                          {<i className={`fab fa-${keySocialMap[key]}`}></i>}
                        </span>
                      ) : null;
                    })}
                  </p>

                  <button
                    type="button"
                    className="btn btn-primary teamModalTrigger"
                    onClick={() =>
                      setMemberInfoFn({ name, title, bio, avatar, social })
                    }
                  >
                    More Info
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer {...footerInfo} />
      </div>
    </>
  );
};
export default Home;
