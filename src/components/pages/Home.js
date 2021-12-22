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
import desktop from '../../imgs/desktop.png';

const innerHeight = window.innerHeight;

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return () => setValue((value) => value + 1);
}

export const Home = () => {
  const forceUpdate = useForceUpdate();
  const githubContext = useContext(GithubContext);
  const [isReady, setIsReady] = useState(false);
  const [memberInfo, setMemberInfo] = useState('');
  const [videoInfo, setVideoInfo] = useState('');
  const [comingSoonModal, setComingSoonModal] = useState(false);
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
    window.addEventListener('scroll', () => animateTimeline(document.body));
    document.fonts.ready.then(() => {
      setIsReady(true);
    });

    //eslint-disable-next-line
  }, []);

  if (loading) return <Loader />;
  const { title, subtitle, videoUrl: mainVideoURL, features = [] } = homeInfo;
  const { title: teamTitle, team = [] } = teamInfo;
  const updatedTeam = [...team].reverse();
  const {
    title: metaTitle,
    subtitle: metaSubTitle,
    metamovers = [],
  } = metamoversInfo;
  const setMemberInfoFn = (bio) => {
    setMemberInfo(bio);
  };
  const chunkSize = isMobile ? 1 : 4;
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
    const comingSoonModal = document.getElementById('comingSoonModal');
    window.onclick = function (event) {
      if (event.target === memberInfoModal) {
        setMemberInfo('');
      }

      if (event.target === videoInfoModal) {
        setVideoInfo('');
      }

      if (event.target === comingSoonModal) {
        setComingSoonModal(false);
      }
    };
  };

  const triggerNext = () => {
    const elem = document.getElementById('courselNextBtn');
    if (elem) elem.click();
    setNextClick(true);
  };

  const keySocialMap = {
    instagram: 'fab fa-instagram',
    behance: 'fab fa-behance',
    facebook: 'fab fa-facebook',
    youtube: 'fab fa-youtube',
    twitter: 'fab fa-twitter',
    spotify: 'fab fa-spotify',
    soundcloud: 'fab fa-soundcloud',
    tiktok: 'fab fa-youtube',
    youtubesecond: 'fab fa-youtube',
    id: 'fas fa-globe',
    personalweb: 'fas fa-globe',
  };

  const animateTimeline = (elm) => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    let scrolled = winScroll;
    const p = elm.parentNode;
    const scrollPerc =
      ((elm.scrollTop || p.scrollTop) / (p.scrollHeight - p.clientHeight)) *
      100;

    if (scrollPerc >= 42 && scrollPerc < 72) {
      let dgSrc = dg1;
      if (scrollPerc > 42 && scrollPerc <= 44) dgSrc = dg1;
      if (scrollPerc > 44 && scrollPerc <= 46) dgSrc = dg2;
      if (scrollPerc > 46 && scrollPerc <= 48) dgSrc = dg3;
      if (scrollPerc > 48 && scrollPerc <= 50) dgSrc = dg4;
      if (scrollPerc > 50 && scrollPerc <= 52) dgSrc = dg5;
      if (scrollPerc > 52 && scrollPerc <= 54) dgSrc = dg6;
      if (scrollPerc > 54 && scrollPerc <= 56) dgSrc = dg7;
      if (scrollPerc > 56 && scrollPerc <= 58) dgSrc = dg8;
      if (scrollPerc > 58 && scrollPerc <= 60) dgSrc = dg9;
      if (scrollPerc > 60 && scrollPerc <= 62) dgSrc = dg10;
      if (scrollPerc > 62 && scrollPerc <= 64) dgSrc = dg11;
      if (scrollPerc > 64 && scrollPerc <= 66) dgSrc = dg12;
      if (scrollPerc > 66 && scrollPerc <= 68) dgSrc = dg13;
      if (scrollPerc > 68 && scrollPerc <= 70) dgSrc = dg14;
      if (scrollPerc > 70 && scrollPerc <= 72) dgSrc = dg16;
      setDgImageSrc(dgSrc);
    }

    let scrolledCondition = scrolled > 2000 && scrolled < 3010;
    if (isMobile) scrolledCondition = scrolled > 3000 && scrolled < 5010;

    if (scrolledCondition) {
      if (scrolled > 3000) scrolled = scrolled - 3000;
      else scrolled = scrolled - 2000;
      scrolled = (scrolled / 10) * 1.5;
      if (scrolled <= 2) return;

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
        <div className={`modal-content ${isMobile ? 'w-75' : 'w-50'}`}>
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
              <div
                className={`col-md-6 ${
                  isMobile ? ' pt-2 text-center' : 'text-left'
                }`}
              >
                <p className="card-text h4 font-weight-bolder mb-1">
                  {memberInfo && memberInfo.name}
                </p>
                <p className="card-text h5">{memberInfo && memberInfo.title}</p>
                <p
                  className={`card-text h6 p-0 d-flex ${
                    isMobile
                      ? 'justify-content-center'
                      : 'justify-content-start'
                  }`}
                >
                  {memberInfo &&
                    Object.entries(memberInfo && memberInfo.social).map(
                      ([key, value]) => {
                        return value && key !== 'id' ? (
                          <span
                            className="socialBtn"
                            key={key}
                            onClick={() => window.open(value)}
                          >
                            <i className={`${keySocialMap[key]}`}></i>
                          </span>
                        ) : null;
                      }
                    )}
                </p>
              </div>
            </div>
            <div>
              <p
                className={`card-text h6 p-3 overflow-auto ${
                  isMobile ? 'text-center' : ''
                }`}
              >
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
        <div
          className={`modal-content ${
            isMobile ? 'w-75' : 'metamoversVideoModal'
          }`}
        >
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
        id="comingSoonModal"
        className={`modal ${comingSoonModal ? 'd-block' : 'd-none'}`}
      >
        <div className={`modal-content w-75`}>
          <div className="modal-header">
            <span
              onClick={() => setComingSoonModal(false)}
              className="close text-dark"
            >
              &times;
            </span>
          </div>
          <div className="modal-body p-2 text-center">
            <img src={desktop} alt="desktop" height="150px" className="mb-2" />

            <h5 className="font-weight-bold">
              Please access website on desktop for buying metamovers.
            </h5>
          </div>
        </div>
      </div>

      <div
        className={`container-fluid ${
          isMobile ? 'mHomeCoverImg' : 'homeCoverImg'
        }`}
        style={{ height: innerHeight }}
      >
        <div id="aboutSection" className="row d-flex justify-content-center">
          <div className="col-md-4 col-xs-12 d-flex justify-content-center align-items-center">
            {isMobile ? (
              <div className="text-center mobileTitleContainer">
                <div className="mHomeTitle">{title}</div>
                <div className="mSubTitle pt-3">{subtitle}</div>
              </div>
            ) : null}
            {!isMobile && isReady ? (
              <div className={`text-left pl-5 `}>
                <div className="homeTitle">{title}</div>
                <div className="subTitle pt-3">{subtitle}</div>
              </div>
            ) : null}
          </div>
          <div
            className={`col-md-8 col-xs-12 ${
              isMobile ? 'pt-5' : 'p-10'
            } d-flex justify-content-center `}
          >
            {mainVideoURL ? (
              <iframe
                className="shadow b-radius-10"
                loading="lazy"
                width="100%"
                height={418}
                title={title}
                src={`https://www.youtube.com/embed/${
                  mainVideoURL.split('=')[1]
                }`}
                frameborder="0"
                allow="accelerometer;fullscreen; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            ) : null}
          </div>
        </div>

        <div
          className={`row pt-0 pb-5 d-flex justify-content-center featureSection ${
            isMobile ? 'pl-1 pr-1' : 'pl-5 pr-5'
          }`}
        >
          {features.map(({ title, subtitle, iconUrl }) => (
            <div
              className={`card service-card ${
                isMobile ? 'highlight-card' : 'animate-border '
              } shadow-sm ${isMobile ? '' : 'width30'} col-xs-12 m-3`}
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
          <section
            className={`pt-5 pb-5 pt-0 pb-5 ${
              isMobile ? 'pl-2 pr-2' : 'pl-5 pr-5'
            }`}
          >
            <div className="container-fluid">
              <div className="row">
                <div className="col-12 text-center">
                  <h1 className="mb-4 font-weight-bold">
                    {metaTitle && metaTitle.toUpperCase()}
                  </h1>
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
                      class={`carousel-control-prev 
                      ${videoInfo ? 'invisible' : ' '}
                      ${comingSoonModal ? 'd-none' : ' '}
                      ${isMobile ? '' : 'carousel-control-prev-home'}`}
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
                      class={`carousel-control-next 
                      ${videoInfo ? 'invisible' : ' '}
                      ${comingSoonModal ? 'd-none' : ' '}
                      ${isMobile ? '' : 'carousel-control-next-home'}`}
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
                  {isMobile ? (
                    <span
                      onClick={() => setComingSoonModal(true)}
                      className={`navbarBtn shadow-sm btn-lg`}
                    >
                      Buy Now
                    </span>
                  ) : (
                    <Link to="/buyNow" className={`navbarBtn shadow-sm btn-lg`}>
                      Buy Now
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>

        <div id="roadMapSection" className="overflowScroll roadMapSectionStyle">
          <div className="row d-flex justify-content-center mb-5">
            <h1 className="font-weight-bold border-bottom-1">
              {roadMapInfoTitle && roadMapInfoTitle.toUpperCase()}
            </h1>
          </div>
          <br />
          <div
            className={`row pt-0 d-flex justify-content-center ${
              isMobile ? 'pl-3 pr-1' : 'pl-5 pr-5'
            }`}
          >
            <div className="col-md-7 col-xs-12">
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
                      <p
                        className={`mt-2 ${isMobile ? '' : 'timelineContent'}`}
                      >
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
          <div className="row d-flex justify-content-center mb-3">
            <h1 className="font-weight-bold border-bottom-1">
              {teamTitle && teamTitle.toUpperCase()}
            </h1>
          </div>
          <div
            className={`row pt-0 pb-5 d-flex justify-content-center flex-wrap-reverse ${
              isMobile ? 'pl-1 pr-1' : 'pl-5 pr-5'
            }`}
          >
            {updatedTeam.map(({ name, title, bio, avatar, social }) => (
              <div
                className={`card teamInfoBox col-xs-12 shadow-sm m-3 ${
                  isMobile ? 'w-100' : 'width30'
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
                          {<i className={`${keySocialMap[key]}`}></i>}
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
