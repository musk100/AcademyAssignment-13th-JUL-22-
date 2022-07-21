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
        <Link to="/user">
          <p className={`${activeTab === "User" ? "active" : ""}`} onClick={() => setActiveTab("User")}>
            Home
          </p>
        </Link>
        <Link to="/userchangepassword">
          <p className={`${activeTab === "UserChangePassword" ? "active" : ""}`} onClick={() => setActiveTab("UserChangePassword")}>
            Change Password
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
