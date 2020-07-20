import React, { useState, useEffect, Fragment } from "react";

function SideBar(props) {
  const [error, setError] = useState(null);
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch("https://api.github.com/users/supreetsingh247")
      .then(res => res.json())
      .then(
        result => {
          console.log(result);
          setUser(result);
        },
        error => {
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    const {
      avatar_url,
      name,
      login,
      bio,
      following,
      followers,
      company,
      location
    } = user;
    return (
      <Fragment>
        <div className="side-section">
          <img src={avatar_url} alt="avatar" className="side-image" />
          <h3>{name}</h3>
          <h4>{login}</h4>
          <button>Follow</button>
          <p>
            <span>{followers}followers &nbsp;</span>
            <span>{following}following</span>
          </p>
          <p>{bio}</p>
          <p>{company}</p>
          <p>{location}</p>
          <p>{login}@gmail.com</p>
        </div>
      </Fragment>
    );
  }
}

export default SideBar;
