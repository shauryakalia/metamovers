import React, { useContext, useEffect } from 'react';
import Loader from '../layout/Loader';
import GithubContext from '../../context/metamovers/context';
import { isMobile } from 'react-device-detect';

export const OurStory = () => {
  const { getOurStoryInfo, ourStoryInfo, loading } = useContext(GithubContext);

  useEffect(() => {
    getOurStoryInfo();
    //eslint-disable-next-line
  }, []);
  if (loading) return <Loader />;

  return (
    <div className="container-fluid homeCoverImg">
      <section class="light">
        <div class="container py-2">
          <div
            class={`h1 text-center font-weight-bold text-white ${
              isMobile ? 'pt-5' : ''
            }`}
            id="pageHeaderTitle"
          >
            Our Story
          </div>

          {ourStoryInfo.map(
            ({ title, content, mediaUrl, date, nftUrl, type }) => (
              <article class="postcard light blue">
                <a class="postcard__img_link" href="/">
                  {type === 'image' ? (
                    <img class="postcard__img" src={mediaUrl} alt={title} />
                  ) : (
                    <video
                      controls
                      preload="none"
                      poster="img/cover.jpg"
                      width="300"
                    >
                      <source src={mediaUrl} type="video/mp4" />
                    </video>
                  )}
                </a>
                <div class="postcard__text t-dark">
                  <h1 class="postcard__title blue">
                    <a href="/">{title}</a>
                  </h1>
                  <div class="postcard__subtitle small">
                    <time datetime="2020-05-25 12:00:00">
                      <i class="fas fa-calendar-alt mr-2"></i>
                      {date}
                    </time>
                  </div>
                  <div class="postcard__bar"></div>
                  <div class="postcard__preview-txt">{content}</div>
                  {nftUrl && (
                    <ul class="postcard__tagbox">
                      <li class="tag__item">
                        <i
                          class="fas fa-tag mr-2"
                          onClick={() => window.open(nftUrl, '_blank')}
                        ></i>
                        Check out the NFT here
                      </li>
                    </ul>
                  )}
                </div>
              </article>
            )
          )}
        </div>
      </section>
    </div>
  );
};
export default OurStory;
