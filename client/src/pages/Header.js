import React, { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "./Header.css"

const Header = () => {
  const [activeTab, setActiveTab] = useState()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === "/mainmenu") {
      setActiveTab("Home")
    } else if (location.pathname === "/addUser") {
      setActiveTab("AddUser")
    } else if (location.pathname === "/changepassword") {
      setActiveTab("ChangePassword")
    } else if (location.pathname === "/addUserGroup") {
      setActiveTab("CreateUserGroup")
    } else if (location.pathname === "/addusertogroup") {
      setActiveTab("AddUserToGroup")
    }
  }, [location])

  async function handleLogout(e) {
    localStorage.removeItem("login")
    localStorage.removeItem("username")
    navigate("/")
  }

  return (
    <div className="header">
      <p className="logo">User Management System</p>
      <div className="header-right">
        <Link to="/mainmenu">
          <p className={`${activeTab === "Home" ? "active" : ""}`} onClick={() => setActiveTab("Home")}>
            Home
          </p>
        </Link>
        <Link to="/addUser">
          <p className={`${activeTab === "AddUser" ? "active" : ""}`} onClick={() => setActiveTab("AddUser")}>
            Add User
          </p>
        </Link>
        <Link to="/changepassword">
          <p className={`${activeTab === "ChangePassword" ? "active" : ""}`} onClick={() => setActiveTab("ChangePassword")}>
            Change Password
          </p>
        </Link>
        <Link to="/addUserGroup">
          <p className={`${activeTab === "CreateUserGroup" ? "active" : ""}`} onClick={() => setActiveTab("CreateUserGroup")}>
            Create UserGroup
          </p>
        </Link>
        <Link to="/addusertogroup">
          <p className={`${activeTab === "AddUserToGroup" ? "active" : ""}`} onClick={() => setActiveTab("AddUserToGroup")}>
            Edit UserGroup
          </p>
        </Link>
        <Link to="/">
          <p className="link-logout" onClick={handleLogout}>
            Logout
          </p>
        </Link>
      </div>
    </div>
  )
}

export default Header
