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
          console.log(result);
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
    </Fragment>
  );
}

export default MainSection;
