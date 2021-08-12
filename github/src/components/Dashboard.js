import React, { useState, useEffect, useContext, useRef } from "react";
import Card from "./Card";
import "./css/Dashboard.css";
import axios from "axios";
import { GithubContext } from "../context/GithubContext";
import Loading from "../images/loading.gif";
export default function Dashboard() {
  const [query, setQuery] = useState("");
  const searchRef = useRef();
  const [error, setError] = useState(false);
  const [state, dispatch] = useContext(GithubContext);

  useEffect(() => {
    searchRef.current.focus();
    const getUsers = async () => {
      try {
        const res = await axios.get("https://api.github.com/users");
        dispatch({ type: "GET_USERS", payload: res.data });
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
    return () => {
      // clean up logic
      // setUsers(null);
    };
  }, []);

  const handleSearch = async (ev) => {
    ev.preventDefault();

    try {
      if (query === "") {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 5000);
        return;
      }

      dispatch({ type: "SET_LOADING", payload: true });
      const res = await axios.get(
        `https://api.github.com/search/users?q=${query}`
      );
      dispatch({ type: "GET_USERS", payload: res.data.items });
    } catch {
      console.log("Error");
    }
  };

  return (
    <>
      <h2>Dashboard </h2>
      <div className="searchBar">
        <form onSubmit={handleSearch}>
          <input
            ref={searchRef}
            className={error ? "search_input input_error" : "search_input"}
            value={query}
            onChange={(ev) => {
              setQuery(ev.target.value);
              // this.setState({ query: ev.target.value });
            }}
            type="text"
            placeholder="Enter a keyword to search..."
          ></input>
        </form>
      </div>
      <div className="dashboardContainer">
        {state.loading ? (
          <img className="loadingImage" src={Loading} alt="Loading" />
        ) : (
          state.users
            ?.filter((user) => {
              return user.login.startsWith(query);
            })
            .map((user) => {
              return (
                <Card
                  avatar_url={user.avatar_url}
                  login={user.login}
                  github_link={user.html_url}
                />
              );
            })
        )}
      </div>
    </>
  );
}
// Dashboard.propTypes = { users: PropTypes.object.isRequired };
