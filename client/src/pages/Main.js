import React from "react"
import Axios from "axios"
import { useEffect, useState } from "react"

function Main() {
  const [user, setUser] = useState({
    username: "",
    password: ""
  })
  const [role, setRole] = useState("")
  useEffect(() => {
    Axios.get("http://localhost:5000/login").then(response => {
      if (response.data.user === true) {
        setRole(response.data.user[0].role)
      }
    })
  }, [])

  return (
    <div>
      <h1>{role}</h1>
    </div>
  )
}

export default Main
