import React from "react";
import PropTypes from "prop-types";

export default function RepoItem(props) {
  return (
    <div className="repoItem">
      <h3>{props.repoName}</h3>
      <p>
        <a href={props.link}>{props.fullName}</a>
      </p>
    </div>
  );
}

RepoItem.propTypes = {
  link: PropTypes.string.isRequired,
  repoName: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
};
