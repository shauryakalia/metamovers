import React, { useContext, useEffect } from 'react';
import Loader from '../layout/Loader';
import GithubContext from '../../context/metamovers/context';

export const OurStory = () => {
  const { getOurStoryInfo, ourStoryInfo, loading } = useContext(GithubContext);

  useEffect(() => {
    getOurStoryInfo();
    //eslint-disable-next-line
  }, []);
  if (loading) return <Loader />;

  return (
    <div className="container-fluid">
      <section class="light">
        <div class="container py-2">
          <div class="h1 text-center text-dark" id="pageHeaderTitle">
            Our Story
          </div>

          {ourStoryInfo.map(({ title, content, mediaUrl, nftUrl }) => (
            <article class="postcard light blue">
              <a class="postcard__img_link" href="/">
                <img
                  class="postcard__img"
                  src="https://picsum.photos/1000/1000"
                  alt="Title"
                />
              </a>
              <div class="postcard__text t-dark">
                <h1 class="postcard__title blue">
                  <a href="/">{title}</a>
                </h1>
                <div class="postcard__subtitle small">
                  <time datetime="2020-05-25 12:00:00">
                    <i class="fas fa-calendar-alt mr-2"></i>Mon, May 25th 2020
                  </time>
                </div>
                <div class="postcard__bar"></div>
                <div class="postcard__preview-txt">{content}</div>
                <ul class="postcard__tagbox">
                  <li class="tag__item">
                    <i class="fas fa-tag mr-2"></i>Check out the NFT here
                  </li>
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
export default OurStory;
