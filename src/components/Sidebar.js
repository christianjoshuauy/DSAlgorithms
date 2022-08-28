import React from "react";
import "../App.css";
import { SidebarData } from "./SidebarData";
import Logo from '../assets/AlgoRythm.png';
import { NavLink } from "react-router-dom";


function Sidebar() {
  return (
    <div className="Sidebar">
      <ul className="SidebarList">
        <div className="logoRow">
          <div id="icon">
            <img src={Logo} alt="Algo Rythm Logo"/>
          </div>
          <div id="title">ALGO RYTHM</div>
        </div>
        <hr className="line"></hr>
        {SidebarData.map((val, idx) => {
          return (
            <NavLink to={val.link} className={(val) => val.isActive ? "row active" : "row"} key={idx} >
              <li
                className="SidebarRow"
                id = "list"
              >
                <div id="icon">{val.icon}</div>
                <div id="title">{val.title}</div>
                
              </li>
            </NavLink>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
