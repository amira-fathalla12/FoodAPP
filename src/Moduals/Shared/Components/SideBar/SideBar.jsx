/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../../assets/Sidebar-icon.png";
import { AuthContext } from "../../../../Context/AuthContext";
import ChangePass from "../../../Authentication/Components/ChangePass/ChangePass";
import Modal from "react-bootstrap/Modal";

export default function SideBar() {
  let { loginData } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false); // Added missing state
  const [isCollapse, setIsCollapse] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const toggleCollapse = () => {
    setIsCollapse(!isCollapse);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const getMenuItemClassName = (path) => {
    return location.pathname === path
      ? "ps-menu-button active"
      : "ps-menu-button";
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 900) {
        setIsCollapse(false);
      } else {
        setIsCollapse(true);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton />
        <Modal.Body>
          <ChangePass handleClose={handleClose} />
        </Modal.Body>
      </Modal>
      <div
        className={`sidebarContainer position-sticky top-0 bottom-0 vh-100 ${
          isCollapse ? "collapsed" : ""
        }`}
      >
        <Sidebar className="border-0" collapsed={isCollapse}>
          <button
            className="firstMenuItem mt-5 mb-4 ms-3 border-0 bg-transparent"
            onClick={toggleCollapse}
          >
            <Link to="/dashboard">
              <img src={logo} alt="logo" />
            </Link>
          </button>
          <Menu>
            <MenuItem
              icon={<i className="fa-solid fa-house" />}
              className={getMenuItemClassName("/dashboard")}
              component={<Link to="/dashboard" />}
            >
              Home
            </MenuItem>
            {loginData?.userGroup === "SuperAdmin" && (
              <MenuItem
                icon={<i className="fa-solid fa-user-group" />}
                className={getMenuItemClassName("/dashboard/users")}
                component={<Link to="/dashboard/users" />}
              >
                Users
              </MenuItem>
            )}
            <MenuItem
              icon={<i className="fa fa-columns" />}
              className={getMenuItemClassName("/dashboard/recipes")}
              component={<Link to="/dashboard/recipes" />}
            >
              Recipes
            </MenuItem>
            {loginData?.userGroup === "SuperAdmin" && (
              <MenuItem
                icon={<i className="fa-solid fa-calendar-days" />}
                className={getMenuItemClassName("/dashboard/Categories")}
                component={<Link to="/dashboard/Categories" />}
              >
                Categories
              </MenuItem>
            )}
            {loginData?.userGroup !== "SuperAdmin" && (
              <MenuItem
                icon={<i className="fa-regular fa-heart" />}
                className={getMenuItemClassName("/dashboard/favorites")}
                component={<Link to="/dashboard/favorites" />}
              >
                Favorites
              </MenuItem>
            )}
            <MenuItem
              icon={<i className="fa-solid fa-unlock-keyhole" />}
              className={getMenuItemClassName("/dashboard/change-password")}
              component={<Link to="/dashboard/" />}
              onClick={handleShow}
            >
              Change Password
            </MenuItem>
            <MenuItem
              onClick={logOut}
              icon={<i className="fa-solid fa-right-from-bracket" />}
              className="ps-menu-button"
            >
              Logout
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </>
  );
}
