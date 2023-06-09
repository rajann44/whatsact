import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../img/nav.png";
import ConfirmModal from "./ConfirmModal";
import { UserContext } from "../context/UserProvider";

const Navbar = () => {
  const { login } = useContext(UserContext);
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
              {login.isLoggedIn && (
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/chat"
                  >
                    Chat
                  </Link>
                </li>
              )}
              {login.isLoggedIn && (
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/group"
                  >
                    Group
                  </Link>
                </li>
              )}
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              {login.isLoggedIn ? (
                <div>
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item mx-2">
                      <button className="btn btn-light" disabled>
                        {login.name.substring(5, 10)}
                      </button>
                    </li>
                    <li className="nav-item">
                      <ConfirmModal></ConfirmModal>
                    </li>
                  </ul>
                </div>
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
