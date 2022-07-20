import React, { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import "./AddUser.module.css"
import Axios from "axios"
import { toast } from "react-toastify"
import Header from ".//Header"
import "./View.css"

const Edit = () => {
  const [user, setUser] = useState("")
  const [state, setState] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    if (!username || !password) {
      toast.error("Please provide value for each input field!", { autoClose: 1000 })
    } else {
      Axios.put(`http://localhost:5000/api/updated/${username}`, {
        username,
        password
      })
        .then(() => {
          setState({ username: "", password: "" })
        })
        .catch(err => toast.error(err.response.data))
    }
    toast.success("User updated successfully!", { autoClose: 1000 })
    navigate("/mainmenu")
  }

  useEffect(() => {
    Axios.get(`http://localhost:5000/api/get/${username}`).then(response => setUser({ ...response.data[0] }))
  }, [username])

  return (
    <>
      <Header />
      <div style={{ marginTop: "100px" }}>
        <h2>Update User Details</h2>
        <form
          autoComplete="off"
          style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "400px",
            alignContent: "center"
          }}
          onSubmit={handleSubmit}
        >
          <label htmlFor="username">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name ..."
            value={username || ""}
            maxLength="12"
            onChange={event => {
              setUsername(event.target.value)
            }}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password ..."
            value={password || ""}
            maxLength="12"
            onChange={event => {
              setPassword(event.target.value)
            }}
          />
          <input type="submit" value={username ? "Update" : "Save"} />
          <Link to="/mainMenu">
            <input type="button" value="Go Back" />
          </Link>
        </form>
      </div>
    </>
  )
}

export default Edit
