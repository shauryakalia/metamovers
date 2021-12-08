/* eslint-disable no-unused-vars */
import React, { useEffect, useContext, useState } from 'react';
import GithubContext from '../../context/metamovers/context';
import Loader from '../layout/Loader';
import Footer from '../layout/Footer';
import metaGif from '../../imgs/Delroy_Brown.gif';
const innerHeight = window.innerHeight;
export const Home = () => {
  const githubContext = useContext(GithubContext);
  const [memberInfo, setMemberInfo] = useState('');
  const [videoInfo, setVideoInfo] = useState('');
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

  const animateTimeline = () => {
    console.log('hi');
    const line = document.querySelector('.timeline-innerline');

    let i = 0;
    let i2 = 1;
    let target1 = document.querySelector('.timeline ul');
    let target2 = document.querySelectorAll('.timeline ul li');

    const timeline_events = document.querySelectorAll('ul li');

    function showTime(e) {
      e.setAttribute('done', 'true');
      e.querySelector('.timeline-point').style.background = 'blue';
      e.querySelector('.date').style.opacity = '100%';
      e.querySelector('p').style.opacity = '100%';
      e.querySelector('p').style.transform = 'translateY(0px)';
    }

    function hideTime(e) {
      e.removeAttribute('done');
      e.querySelector('.timeline-point').style.background =
        'rgb(228, 228, 228)';
      e.querySelector('.date').style.opacity = '0%';
      e.querySelector('p').style.opacity = '0%';
      e.querySelector('p').style.transform = 'translateY(-10px)';
    }

    function slowLoop() {
      setTimeout(function () {
        showTime(timeline_events[i]);
        timelineProgress(i + 1);
        i++;
        if (i < timeline_events.length) {
          slowLoop();
        }
      }, 800);
    }

    function timelineProgress(value) {
      let progress = `${(value / timeline_events.length) * 100}%`;
      if (window.matchMedia('(min-width: 728px)').matches) {
        line.style.width = progress;
        line.style.height = '4px';
      } else {
        line.style.height = progress;
        line.style.width = '4px';
      }
    }

    let observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0.9) {
            if (window.matchMedia('(min-width: 728px)').matches) {
              slowLoop();
            } else {
              showTime(entry.target);
              timelineProgress(i2);
              i2++;
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 1, rootMargin: '0px 0px -50px 0px' }
    );

    if (window.matchMedia('(min-width: 728px)').matches) {
      observer.observe(target1);
    } else {
      target2.forEach((t) => {
        observer.observe(t);
      });
    }

    timeline_events.forEach((li, index) => {
      li.addEventListener('click', () => {
        if (li.getAttribute('done')) {
          timelineProgress(index);

          // hide all timeline events from last upto the point clicked
          timeline_events.forEach((ev, idx) => {
            if (idx >= index) {
              hideTime(ev);
            }
          });
        } else {
          timelineProgress(index + 1);
          // show all timeline events from first upto the point clicked
          timeline_events.forEach((ev, idx) => {
            if (idx <= index) {
              showTime(ev);
            }
          });
        }
      });
    });

    var doit;
    window.addEventListener('resize', () => {
      clearTimeout(doit);
      doit = setTimeout(resizeEnd, 1200);
    });

    function resizeEnd() {
      i = 0;
      slowLoop();
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
            <span onClick={() => setMemberInfo(null)} className="close text-dark">
              &times;
            </span>
          </div>
          <div className="modal-body p-2">
            <div className="row">
              <div className="col-md-4 text-center">
                <img
                  alt=""
                  className="card-img-top metamoversImg shadow-sm mx-auto"
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
            <span onClick={() => setVideoInfo(null)} className="close text-dark">
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
        <div className="row pl-5 pr-5 pt-0 pb-5 d-flex justify-content-center">
          {features.map(({ title, subtitle, iconUrl }) => (
            <div className="card animate-border service-card shadow-sm m-3">
              <img
                alt=""
                className="card-img-top metamoversImg shadow-sm mx-auto"
                src={iconUrl}
              />
              <div className="card-body">
                <p className="card-text h4 font-weight-bolder mb-3">{title}</p>
                <hr />
                <p className="card-text h6 text-secondary">{subtitle}</p>
              </div>
            </div>
          ))}
        </div>
        <div
          id="metamoversSection"
          className="row themeBgClr mb-5  text-white d-flex justify-content-center"
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
                          <div className="col-md-3 mb-3">
                            <div className="card shadow-lg border-0 text-dark">
                              <img
                                className="card-img-top metamoversVideo"
                                src={
                                  child2.videoGif
                                    ? `${child2.videoGif}.gif`
                                    : metaGif
                                }
                                alt={`${child2.name}`}
                                onClick={() => setVideoInfo(child2.videourl)}
                              />
                            </div>
                          </div>
                        ));
                        return (
                          <div
                            className={`carousel-item ${idx === 0 ? 'active' : ''}`}
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
        <div id="roadMapSection" onscroll={() => animateTimeline()}>
          <div className="row d-flex justify-content-center">
            <h1 className="font-weight-bold border-bottom-1">
              {roadMapInfoTitle}
            </h1>
          </div>
          <div className="row pl-5 pr-5 pt-0 pb-5 d-flex justify-content-center">
            <div className="col-md-6">
              <section className="timeline">
                <div className="timeline-line">
                  <span className="timeline-innerline"></span>
                </div>
                <ul>
                  {roadmap.map((childRoadMap) => (
                    <li key={childRoadMap.sno}>
                      <span className="timeline-point font-weight-bold"></span>
                      <span className="date font-weight-bold">
                        {childRoadMap.title}
                      </span>
                      <p>{childRoadMap.subtitle}</p>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
            <div className="col-md-6">dance</div>
          </div>
        </div>
        <div id="theTeamSection">
          <div className="row d-flex justify-content-center">
            <h1 className="font-weight-bold border-bottom-1">{teamTitle}</h1>
          </div>
          <div className="row pl-5 pr-5 pt-0 pb-5 d-flex justify-content-center">
            {team.map(({ name, title, bio, avatar, social }) => (
              <div className="card teamInfoBox shadow-sm m-3">
                <img
                  alt=""
                  className="card-img-top metamoversImg shadow-sm mx-auto"
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
                          <i className={`fab fa-${key}`}></i>
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
