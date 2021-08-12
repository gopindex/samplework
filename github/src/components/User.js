import React, { useEffect, useContext } from "react";
import axios from "axios";
import { GithubContext } from "../context/GithubContext";
import RepoItem from "./RepoItem";
import { useParams } from "react-router-dom";
import "./css/User.css";
export default function User() {
  const [state, dispatch] = useContext(GithubContext);
  const params = useParams();

  useEffect(() => {
    async function getUserandRepos() {
      const username = params.username;

      const [allrepos, myuser] = await Promise.all([
        axios.get(
          `https://api.github.com/users/${username}/repos?page=1&per_page=5`
        ),
        axios.get(`https://api.github.com/users/${username}`),
      ]);
      dispatch({ type: "GET_ALL_REPOS", payload: allrepos.data });
      dispatch({ type: "GET_USER", payload: myuser.data });
    }
    getUserandRepos();

    // return () => {
    //   setRepos([]);
    //   setUser({});
    // };
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="userContainer">
        <h1>{state.user.login}</h1>
        <h2>{state.user.name}</h2>
        <h2>Public Gists: {state.user.public_gists}</h2>
        <h2>Location: {state.user.location}</h2>
        <h2>Public Repos: {state.user.public_repos}</h2>
      </div>
      <div className="repoContainer">
        {state.repos?.map((repo) => {
          return (
            <RepoItem
              fullName={repo.full_name}
              link={repo.html_url}
              repoName={repo.name}
            />
          );
        })}
      </div>
    </>
  );
}
