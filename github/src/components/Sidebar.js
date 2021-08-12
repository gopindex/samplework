import React from "react";
import { Link } from "react-router-dom";
import "./css/Sidebar.css";
export default function Sidebar() {
  return (
    <div className="sideBar">
      <ul>
        <li>
          <Link to="/">
            <i className="fab fa-500px"></i>
            <span className="link_name">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/about">
            <i className="fas fa-address-card"></i>
            <span className="link_name">About</span>
          </Link>
        </li>
        <li>
          <Link to="/contact">
            <i className="fas fa-hands-helping"></i>
            <span className="link_name">Contact</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
