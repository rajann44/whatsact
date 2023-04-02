import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../img/nav.png";
import { Appstate } from "../App";

const Navbar = () => {
  const useAppstate = useContext(Appstate);
  const navigate = useNavigate();

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: "#075e54" }}
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              src={logo}
              alt="Logo"
              width="32"
              height="32"
              className="d-inline-block align-text-top"
            />
            WhatsAct
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/chat"
                >
                  Chat
                </Link>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              {useAppstate.login ? (
                <button className="btn btn-light" disabled>
                  {useAppstate.loginUserName.substring(0, 6)}
                </button>
              ) : (
                <button
                  className="btn btn-light"
                  type="submit"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              )}
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
