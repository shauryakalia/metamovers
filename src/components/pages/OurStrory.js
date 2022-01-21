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
    <div className="container-fluid">
      <section>
        <div class="container py-2">
          <div
            class={`h1 text-center font-weight-bold text-dark ${
              isMobile ? 'pt-5' : ''
            }`}
            id="pageHeaderTitle"
          >
            Our Story
          </div>

          {ourStoryInfo.map(
            ({ content, mediaUrl, nftUrl, mediaType, thumbnail, endTitle }) => (
              <article class="postcard light blue">
                {mediaType ? (
                  <img
                    preload
                    class="postcard__img"
                    src={mediaUrl}
                    alt={mediaUrl}
                  />
                ) : (
                  <video
                    controls
                    preload="none"
                    poster={thumbnail}
                    width={isMobile ? '100%' : '50%'}
                  >
                    <source src={mediaUrl} type="video/mp4" />
                  </video>
                )}

                <div class="postcard__text t-dark">
                  <div class="postcard__bar"></div>
                  <div class="postcard__preview-txt">{content}</div>
                  <div class="mt-4 text-center font-weight-bold">
                    {endTitle}
                  </div>

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
