/* eslint-disable no-unused-vars */
import React, { useEffect, useContext, useState } from 'react';
import GithubContext from '../../context/metamovers/context';
import Loader from '../layout/Loader';
import Footer from '../layout/Footer';
const innerHeight = window.innerHeight;
export const Home = () => {
  const githubContext = useContext(GithubContext);
  const [memberInfo, setMemberInfo] = useState('');
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
  } = githubContext;
  useEffect(() => {
    getHomeInfo();
    getTeamInfo();
    getMetamoversInfo();
    getFooterInfo();
    //eslint-disable-next-line
  }, []);

  if (loading) return <Loader />;
  const { title, subtitle, videoUrl, features = [] } = homeInfo;
  const { title: teamTitle, team = [] } = teamInfo;
  const {
    title: metaTitle,
    subtitle: metaSubTitle,
    metamovers = [],
  } = metamoversInfo;
  const setMemberInfoFn = (bio) => {
    setMemberInfo(bio);
  };
  const chunkSize = 3;
  const chunkMetamovers = [];

  for (let i = 0; i < metamovers.length; i += chunkSize) {
    chunkMetamovers.push(metamovers.slice(i, chunkSize + i));
  }

  return (
    <>
      <div id="myModal" class={`modal ${memberInfo ? 'd-block' : 'd-none'}`}>
        <div class="modal-content">
          <div class="modal-header">
            <span onClick={() => setMemberInfo(null)} class="close text-dark">
              &times;
            </span>
          </div>
          <div class="modal-body p-2">
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
                            <i class={`fab fa-${key}`}></i>
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
          <iframe
            className="shadow-lg"
            width="90%"
            height={innerHeight - 102}
            title={title}
            src="https://www.youtube.com/embed/OknPSnXlnOY"
            frameborder="0"
            allow="accelerometer;fullscreen; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
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
          <section class="pt-5 pb-5 pl-5 pr-5 pt-0 pb-5">
            <div class="container">
              <div class="row">
                <div class="col-10">
                  <h1 class="mb-2 font-weight-bold">{metaTitle}</h1>
                  <h6 class="mb-2 metamoversSubTitle">{metaSubTitle}</h6>
                </div>
                <div class="col-2 text-right">
                  <a
                    class="btn btn-light text-primary mb-3 mr-1"
                    href="#carouselExampleIndicators2"
                    role="button"
                    data-slide="prev"
                  >
                    <i class="fa fa-arrow-left"></i>
                  </a>
                  <a
                    class="btn btn-light text-primary mb-3 "
                    href="#carouselExampleIndicators2"
                    role="button"
                    data-slide="next"
                  >
                    <i class="fa fa-arrow-right"></i>
                  </a>
                </div>
                <div class="col-12 mt-3">
                  <div
                    id="carouselExampleIndicators2"
                    class="carousel slide"
                    data-ride="carousel"
                  >
                    <div class="carousel-inner">
                      {chunkMetamovers.map((childChunk, idx) => {
                        const currentItems = childChunk.map((child2) => (
                          <div class="col-md-4 mb-3">
                            <div class="card shadow-lg p-2">
                              <video
                                className="metamoversVideo"
                                src={child2.videourl}
                                controls
                              ></video>
                            </div>
                          </div>
                        ));
                        return (
                          <div
                            class={`carousel-item ${idx === 0 ? 'active' : ''}`}
                          >
                            <div class="row">{currentItems}</div>
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
                          <i class={`fab fa-${key}`}></i>
                        </span>
                      ) : null;
                    })}
                  </p>

                  <button
                    type="button"
                    class="btn btn-primary teamModalTrigger"
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
