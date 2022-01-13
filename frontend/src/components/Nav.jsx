import React from "react";
import { useUser } from "../context/UserContext";
import { useHistory, NavLink } from "react-router-dom";
import img from "../public/img/user.png";

export const Nav = () => {
  const { user, logout } = useUser();
  const history = useHistory();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
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
          {!user.isAdmin ? (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/products"
                  exact
                  activeClassName="active"
                >
                  Products <span className="sr-only">(current)</span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/my-products"
                  exact
                  activeClassName="active"
                >
                  My products
                </NavLink>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item active">
                <NavLink
                  className="nav-link"
                  to="/products"
                  exact
                  activeClassName="active"
                >
                  Products <span className="sr-only">(current)</span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/my-products"
                  exact
                  activeClassName="active"
                >
                  My products
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/admin-users"
                  exact
                  activeClassName="active"
                >
                  Admin users
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/admin-products"
                  exact
                  activeClassName="active"
                >
                  Admin products
                </NavLink>
              </li>
            </ul>
          )}
        </div>
        <div className="dropdown d-flex text-light">
          {user.name}
          <img
            role="button"
            id="dropdownMenuLink"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            src={img}
            className="dropdown-toggle rounded-circle dropdown-toggle"
            height={30}
            style={{ marginLeft: 10 }}
          ></img>

          <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <li>
              <a
                className="dropdown-item"
                onClick={(e) => {
                  logout(history);
                }}
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};