import React, { useState } from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaChartBar,
  FaCog
} from "react-icons/fa";
import {
  RiBriefcase4Fill
} from "react-icons/ri";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

const SideBar = () => {
  const [dropdowns, setDropdowns] = useState({
    cases: false,
    history: false
  });

  const toggleDropdown = (name) => {
    setDropdowns((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/Admin/dashboard">
            <FaUsers size={20} />
            <span>Dashboard</span>
          </Link>
        </li>
       

        <li className="nav-item">
          <a
            className={`nav-link ${dropdowns.cases ? "" : "collapsed"}`}
            onClick={() => toggleDropdown("cases")}
            style={{ cursor: "pointer" }}
          >
            <RiBriefcase4Fill size={20} />
            <span>Add Seo Content</span>
            {dropdowns.cases ? <BiChevronUp size={20} /> : <BiChevronDown size={20} />}
          </a>
          <ul id="cases-nav" className={`nav-content collapse ${dropdowns.cases ? "show" : ""}`}>
            <li>
              <Link to="/admin/seo/content">
                <i className="bi bi-circle"></i>
                <span>Meta Title</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/seo/allcontent">
                <i className="bi bi-circle"></i>
                <span>Seo Content</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/seo/create-sitemap">
                <i className="bi bi-circle"></i>
                <span>Create Sitemap</span>
              </Link>
            </li>
          </ul>
        </li>

        

        <li className="nav-item">
          <Link className="nav-link" to="/logout">
            <i className="fas fa-sign-out-alt"></i>
            <span>Log Out</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
