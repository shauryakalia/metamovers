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
        <div className="container py-2">
          <div
            className={`h1 text-center font-weight-bold text-dark ${
              isMobile ? 'pt-5' : ''
            }`}
            id="pageHeaderTitle"
          >
            Our Story
          </div>

          {ourStoryInfo.map(
            ({ content, mediaUrl, nftUrl, mediaType, thumbnail, endTitle }) => (
              <article className="postcard light blue">
                {mediaType ? (
                  <img
                    preload
                    className="postcard__img"
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

                <div className="postcard__text t-dark">
                  <div className="postcard__bar"></div>
                  <div className="postcard__preview-txt">{content}</div>
                  <div className="mt-4 text-center font-weight-bold">
                    {endTitle}
                  </div>

                  {nftUrl && (
                    <ul className="postcard__tagbox">
                      <li 
                        className="tag__item"
                        onClick={() => window.open(nftUrl, '_blank')}
                      >
                        <i className="fas fa-tag mr-2"></i>
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
