/* eslint-disable no-unused-vars */
import React, { useEffect, useContext, useState } from 'react';
import GithubContext from '../../context/metamovers/context';
import { Link } from 'react-router-dom';
import Loader from '../layout/Loader';
import Footer from '../layout/Footer';
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
import dg12 from '../../imgs/12.png';
import dg13 from '../../imgs/13.png';
import dg14 from '../../imgs/14.png';
import dg15 from '../../imgs/15.png';
import dg16 from '../../imgs/16.png';
import { isMobile } from 'react-device-detect';

const innerHeight = window.innerHeight;

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return () => setValue((value) => value + 1);
}

export const Home = () => {
  const forceUpdate = useForceUpdate();
  const githubContext = useContext(GithubContext);
  const [memberInfo, setMemberInfo] = useState('');
  const [videoInfo, setVideoInfo] = useState('');
  const [dgImageSrc, setDgImageSrc] = useState(dg1);
  const [nextClick, setNextClick] = useState(false);
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
    window.addEventListener('resize', forceUpdate);
    window.addEventListener('scroll', animateTimeline);

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

  if (chunkMetamovers.length) {
    const lastlen = chunkMetamovers[chunkMetamovers.length - 1].length;

    if (lastlen !== chunkSize) {
      const remainEle = chunkSize - lastlen;
      for (let i = 0; i < remainEle; i += 1) {
        chunkMetamovers[chunkMetamovers.length - 1].push(metamovers[i]);
      }
    }
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

  const triggerNext = () => {
    const elem = document.getElementById('courselNextBtn');
    if (elem) elem.click();
    setNextClick(true);
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
    if (scrolled > 2000 && scrolled < 3010) {
      if (scrolled > 3000) scrolled = scrolled - 3000;
      else scrolled = scrolled - 2270;
      scrolled = (scrolled / 10) * 1.5;
      if (scrolled <= 2) return;

      let dgSrc = dg1;
      if (scrolled > 1 && scrolled <= 6) dgSrc = dg1;
      if (scrolled > 6 && scrolled <= 12) dgSrc = dg2;
      if (scrolled > 12 && scrolled <= 18) dgSrc = dg3;
      if (scrolled > 18 && scrolled <= 24) dgSrc = dg4;
      if (scrolled > 24 && scrolled <= 35) dgSrc = dg5;
      if (scrolled > 30 && scrolled <= 36) dgSrc = dg6;
      if (scrolled > 36 && scrolled <= 42) dgSrc = dg7;
      if (scrolled > 42 && scrolled <= 48) dgSrc = dg8;
      if (scrolled > 48 && scrolled <= 54) dgSrc = dg9;
      if (scrolled > 54 && scrolled <= 60) dgSrc = dg10;
      if (scrolled > 60 && scrolled <= 66) dgSrc = dg11;
      if (scrolled > 66 && scrolled <= 72) dgSrc = dg12;
      if (scrolled > 72 && scrolled <= 78) dgSrc = dg13;
      if (scrolled > 78 && scrolled <= 84) dgSrc = dg14;
      if (scrolled > 84 && scrolled <= 90) dgSrc = dg15;
      if (scrolled > 90 && scrolled <= 96) dgSrc = dg16;
      if (scrolled > 96 && scrolled <= 102) dgSrc = dg1;
      if (scrolled > 102 && scrolled <= 108) dgSrc = dg2;
      if (scrolled > 108 && scrolled <= 114) dgSrc = dg3;
      if (scrolled > 114 && scrolled <= 120) dgSrc = dg4;
      setDgImageSrc(dgSrc);
      if (scrolled > 100) scrolled = 100;
      document.getElementById('myTimelineBar').style.height = scrolled + '%';
    }
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
            <div className="row d-flex align-items-center">
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

      <div className="container-fluid" style={{ height: innerHeight }}>
        <div id="aboutSection" className="row d-flex justify-content-center">
          <div className="text-center">
            <div className="homeTitle">{title?.toUpperCase()}</div>
            <div className="subTitle pt-3">{subtitle}</div>
          </div>
        </div>
        <div
          className={`row ${
            isMobile ? 'pt-5' : 'p-10'
          } d-flex justify-content-center`}
        >
          {mainVideoURL ? (
            <iframe
              className="shadow-lg"
              loading="lazy"
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
        <div
          className={`row pt-0 pb-5 d-flex justify-content-center featureSection ${
            isMobile ? 'pl-1 pr-1' : 'pl-5 pr-5'
          }`}
        >
          {features.map(({ title, subtitle, iconUrl }) => (
            <div
              className={`card animate-border service-card ${
                isMobile ? '' : 'width30'
              } col-xs-12 m-3`}
            >
              <img
                alt=""
                className="card-img-top metamoversImg shadow-sm mx-auto"
                src={iconUrl}
                loading="lazy"
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
          className="row metamoversSectionBg mb-5  text-white d-flex justify-content-center zIndex10"
          onMouseOver={() => !nextClick && triggerNext()}
        >
          <section className="pt-5 pb-5 pl-5 pr-5 pt-0 pb-5">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12 text-center">
                  <h1 className="mb-4 font-weight-bold">{metaTitle}</h1>
                  <h6 className="mb-2 metamoversSubTitle">{metaSubTitle}</h6>
                </div>

                <div className="col-12 mt-3">
                  <div
                    id="metaMoversCoursel"
                    className="carousel slide"
                    data-ride="carousel"
                  >
                    <div className="carousel-inner">
                      {chunkMetamovers.map((childChunk, idx) => {
                        const currentItems = childChunk.map((child2) => (
                          <div className="col-md-3 mb-3 mt-3">
                            <div
                              className="card shadow-lg border-0 text-dark rounded metamoversVideo"
                              alt={`${child2.name}`}
                              onClick={() => setVideoInfo(child2.videourl)}
                            >
                              <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                width="100%"
                                className="d-block img-fluid"
                                id={`video-${idx}`}
                              >
                                <source
                                  src={child2.videourl}
                                  type="video/mp4"
                                  title={`${child2.name}`}
                                />
                                Your browser does not support the video tag.
                              </video>
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
                    <a
                      class="carousel-control-prev carousel-control-prev-home"
                      href="#metaMoversCoursel"
                      role="button"
                      data-slide="prev"
                    >
                      <span
                        class="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span class="sr-only">Previous</span>
                    </a>
                    <a
                      class="carousel-control-next carousel-control-next-home"
                      href="#metaMoversCoursel"
                      role="button"
                      data-slide="next"
                      id="courselNextBtn"
                    >
                      <span
                        class="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span class="sr-only">Next</span>
                    </a>
                  </div>
                </div>
                <div className="col-md-12 mt-5 mb-3 text-center">
                  <Link to="/buyNow" className={`navbarBtn shadow-sm btn-lg`}>
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div id="roadMapSection" className="overflowScroll roadMapSectionStyle">
          <div className="row d-flex justify-content-center mb-5">
            <h1 className="font-weight-bold border-bottom-1">
              {roadMapInfoTitle}
            </h1>
          </div>
          <br />
          <div className="row pl-5 pr-5 pt-0 d-flex justify-content-center">
            <div className="col-md-7 col-x-12">
              <div className="header">
                <div className="progress-container">
                  <div className="custom-progress-bar" id="myTimelineBar"></div>
                </div>
              </div>
              <section className="timeline">
                <ol>
                  {roadmap.map((childRoadMap) => (
                    <li key={childRoadMap.sno}>
                      <span className="timeline-point font-weight-bold"></span>
                      <span className="date font-weight-bold ">
                        {childRoadMap.title}
                      </span>
                      <p className="mt-2 timelineContent">
                        {childRoadMap.subtitle}
                      </p>
                    </li>
                  ))}
                </ol>
              </section>
            </div>
            <div
              className={`col-md-5 dancingGirlSectionBg ${
                isMobile ? 'd-none' : ''
              }`}
            >
              <img alt="" className="dgImage" src={dgImageSrc} />
            </div>
          </div>
        </div>

        <div id="theTeamSection" className="meetTheTeamSection">
          <div className="row d-flex justify-content-center mb-5">
            <h1 className="font-weight-bold border-bottom-1">{teamTitle}</h1>
          </div>
          <div
            className={`row pt-0 pb-5 d-flex justify-content-center ${
              isMobile ? 'pl-1 pr-1' : 'pl-5 pr-5'
            }`}
          >
            {team.map(({ name, title, bio, avatar, social }) => (
              <div
                className={`card teamInfoBox col-xs-12 shadow-sm m-3 ${
                  isMobile ? '' : 'width30'
                }`}
              >
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
                    className="btn btn-primary teamModalTrigger font-weight-bold"
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
