// eslint-disable-next-line no-unused-vars
import React from "react";
import {  } from "react-router-dom";
import logo from "../components/assets/Vintage.png";

const Nav = () => {
  return (
    <>
      <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img
              src={logo}
              height="70"
              alt="Vintage Logo"
              loading="lazy"
              style={{ marginTop: "2px" }}
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* start */}
          <div className="collapse navbar-collapse nav_ul align-items-center" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Products
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Contact Us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Categories
                </a>
              </li>
            </ul>

            <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn3" type="submit">
                  Search
                </button>
              </form>
            <div>
              <button className="btn1 mx-2 ms-5" type="submit">Log in</button>
              <button className="btn2 mx-" type="submit">Sign up</button>
            </div>    
          </div>
          {/* end */}
        </div>
      </nav>
    </>
  );
};

export default Nav;
