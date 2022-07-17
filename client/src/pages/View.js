import React, { useState, useEffect } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import Axios from "axios"
import "./View.css"
import Header from ".//Header"
import { toast } from "react-toastify"

const initialState = {
  username: "",
  email: "",
  password: "",
  userGroup: ""
}

const View = () => {
  const [user, setUser] = useState(initialState)
  const { email, password, usergroup } = user
  const { username } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    Axios.get(`http://localhost:5000/api/get/${username}`)
      // .then(response => console.log(response))
      .then(response => setUser({ ...response.data[0] }))
  }, [])

  const updateUser = e => {
    //update codes
    e.preventDefault()
    Axios.put(`http://localhost:5000/api/update/${username}`, user).then(() => {
      setUser({ email: "", password: "", userGroup: "" })
    })
    navigate("/mainmenu")
  }

  return (
    <>
      <Header />
      <div style={{ marginTop: "150px" }}>
        <div className="card">
          <div className="card-header">
            <p>User Contact Detail</p>
          </div>
          <div className="container">
            {/* <strong>ID:</strong>
            <span>{id}</span>
            <br />
            <br /> */}
            <strong>Username:</strong>
            <span>{user.username}</span>
            <br />
            <br />
            <strong>Email:</strong>
            <span>{user.email}</span>
            <br />
            <br />
            <strong>Password:</strong>
            <span>{user.password}</span>
            <br />
            <br />
            <strong>UserGroup:</strong>
            <span>{user.usergroup}</span>
            <br />
            <br />
            <Link to="/mainmenu">
              <div className="btn btn-edit">Go Back</div>
            </Link>
          </div>
        </div>

        <div style={{ marginTop: "100px" }}>
          <h2>Update User Information</h2>
          <form
            autoComplete="off"
            style={{
              margin: "auto",
              padding: "15px",
              maxWidth: "400px",
              alignContent: "center"
            }}
            onSubmit={updateUser}
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
                setUser({ ...user, username: event.target.value })
              }}
              disabled
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email ..."
              value={email || ""}
              onChange={event => {
                setUser({ ...user, email: event.target.value })
              }}
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
                setUser({ ...user, password: event.target.value })
              }}
              required
            />
            <label htmlFor="usergroup">User Group</label>
            <input
              type="text"
              id="usergroup"
              name="usergroup"
              placeholder="User Group ..."
              value={usergroup || ""}
              onChange={event => {
                setUser({ ...user, usergroup: event.target.value })
              }}
              required
            />
            <label htmlFor="status">Status</label>

            <input type="submit" value={username ? "Update" : "Save"} />
            <Link to="/mainMenu">
              <input type="button" value="Go Back" />
            </Link>
          </form>
        </div>
      </div>
    </>
  )
}

export default View
