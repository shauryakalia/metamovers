import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import loading_url from '../../imgs/loading.gif';
import GithubContext from '../../context/github_finder/context';

const Profile = () => {
  const params = useParams();
  const githubContext = useContext(GithubContext);
  const { getUserProfile, userProfile, loading } = githubContext;
  useEffect(() => {
    getUserProfile(params.username);
    //eslint-disable-next-line
  }, []);

  const {
    login,
    id,
    avatar_url,
    html_url,
    repos_url,
    site_admin,
  } = userProfile;
  return (
    <div className="container-fluid p-5 mt-5">
      {loading ? (
        <img
          src={loading_url}
          className="card-img-top w-25"
          alt="Github Finder Loading"
          style={{ marginLeft: '38%' }}
        />
      ) : (
        <div className="container-fluid mt-5 d-flex ">
          <div
            className="card mt-5"
            style={{ maxWidth: '540px', margin: '0 auto' }}
          >
            <div className="row no-gutters">
              <div className="col-md-4">
                <img src={avatar_url} className="card-img" alt="..." />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">
                    {login} ({id})
                  </h5>
                  <p className="card-text">
                    {html_url}
                    <br />
                    {repos_url}
                    <br />
                    {site_admin}
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      Last updated 3 mins ago
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
