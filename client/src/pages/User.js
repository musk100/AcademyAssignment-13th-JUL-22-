import React, { useState, useEffect } from "react"
import "./Home.css"
import Axios from "axios"
import UserHeader from ".//UserHeader"

function User() {
  const [data, setData] = useState([])

  //on initial load, fetch all data from backend
  useEffect(() => {
    loadData()
  }, [])

  //fetch all data from API
  const loadData = async () => {
    const response = await Axios.get("http://localhost:5000/api/get")
    setData(response.data)
  }

  return (
    <>
      <UserHeader />
      <div style={{ marginTop: "100px" }}>
        <h2>User Profile</h2>
      </div>
    </>
  )
}

export default User
