import React from "react";
import Sidebar from "../Sidebar";

export default function Layout(props) {
  return (
    <div className="mainLayout">
      <Sidebar />
      <main>{props.children}</main>
    </div>
  );
}
