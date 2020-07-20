import React, { useState, useEffect, Fragment } from "react";
import Repo from "./repo";

function MainSection(props) {
  const [error, setError] = useState(null);
  const [userRepo, setUserRepo] = useState([]);
  const [filteredRepos, setFilteredRepos] = useState([]);
  const [selectedType, setType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const getRepo = () => {
    fetch("https://api.github.com/users/supreetsingh247/repos")
      .then(res => res.json())
      .then(
        result => {
          setUserRepo(result);
        },
        error => {
          setError(error);
        }
      );
  };

  useEffect(() => {
    getRepo();
    const repos = userRepo.filter(repo =>
      repo.name.toLowerCase().includes(searchTerm)
    );
    setFilteredRepos(repos);
  }, [searchTerm, userRepo]);

  const searchHandle = event => {
    const type = event.target.value;
    setType(type);
    const url =
      "https://github.com/supreetsingh247?tab=repositories&q=&type=" +
      type +
      "&language=";
    return fetch(url, { mode: "no-cors" })
      .then(res => res.json())
      .then(
        result => {
          setUserRepo(result);
        },
        error => {
          setError(error);
        }
      );
  };

  const inputSerachHandle = event => {
    const searchText = event.target.value;
    setSearchTerm(searchText);
  };

  return (
    <Fragment>
      <div className="main-section">
        <div className="tabs">
          <input type="radio" name="tabs" id="tab1" />
          <label htmlFor="tab1">
            <span>
              <svg
                height="16"
                className="octicon octicon-book UnderlineNav-octicon hide-sm tab-svg"
                viewBox="0 0 16 16"
                version="1.1"
                width="16"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M0 1.75A.75.75 0 01.75 1h4.253c1.227 0 2.317.59 3 1.501A3.744 3.744 0 0111.006 1h4.245a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75h-4.507a2.25 2.25 0 00-1.591.659l-.622.621a.75.75 0 01-1.06 0l-.622-.621A2.25 2.25 0 005.258 13H.75a.75.75 0 01-.75-.75V1.75zm8.755 3a2.25 2.25 0 012.25-2.25H14.5v9h-3.757c-.71 0-1.4.201-1.992.572l.004-7.322zm-1.504 7.324l.004-5.073-.002-2.253A2.25 2.25 0 005.003 2.5H1.5v9h3.757a3.75 3.75 0 011.994.574z"
                ></path>
              </svg>
            </span>
            <span>Overview</span>
          </label>

          <input type="radio" name="tabs" id="tab2" defaultChecked />
          <label htmlFor="tab2">
            <span>
              <svg
                height="16"
                className="octicon octicon-repo UnderlineNav-octicon hide-sm tab-svg"
                viewBox="0 0 16 16"
                version="1.1"
                width="16"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"
                ></path>
              </svg>
            </span>
            <span>Repository</span>
          </label>

          <input type="radio" name="tabs" id="tab3" />
          <label htmlFor="tab3">
            <span>
              <svg
                height="16"
                className="octicon octicon-project UnderlineNav-octicon hide-sm tab-svg"
                viewBox="0 0 16 16"
                version="1.1"
                width="16"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M1.75 0A1.75 1.75 0 000 1.75v12.5C0 15.216.784 16 1.75 16h12.5A1.75 1.75 0 0016 14.25V1.75A1.75 1.75 0 0014.25 0H1.75zM1.5 1.75a.25.25 0 01.25-.25h12.5a.25.25 0 01.25.25v12.5a.25.25 0 01-.25.25H1.75a.25.25 0 01-.25-.25V1.75zM11.75 3a.75.75 0 00-.75.75v7.5a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75zm-8.25.75a.75.75 0 011.5 0v5.5a.75.75 0 01-1.5 0v-5.5zM8 3a.75.75 0 00-.75.75v3.5a.75.75 0 001.5 0v-3.5A.75.75 0 008 3z"
                ></path>
              </svg>
            </span>
            <span>Projects</span>
          </label>

          <div id="tab-content1" className="tab-content">
            <h3>Overview</h3>
          </div>

          <div id="tab-content2" className="tab-content">
            <div className="repo-section-header">
              <input
                type="text"
                placeholder="Find a repository..."
                onChange={inputSerachHandle}
              />
              <select name="type" value={selectedType} onChange={searchHandle}>
                <option value="source">Sources</option>
                <option value="fork">Forks</option>
                <option value="archived">Archived</option>
                <option value="mirror">Mirrors</option>
              </select>
              <select name="language" id="">
                <option default>Language</option>
                <option value="all">All</option>
              </select>
            </div>
            {error && <div>Error: {error.message}</div>}
            {!error && (
              <ul className="repo-list">
                {filteredRepos.map(repo => (
                  // <div key={}></div>
                  <Repo key={repo.id} repo={repo}></Repo>
                ))}
              </ul>
            )}
          </div>

          <div id="tab-content3" className="tab-content">
            <h3>Projects</h3>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default MainSection;
