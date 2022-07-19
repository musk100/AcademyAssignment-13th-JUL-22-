import React, { useState, useEffect } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import CreatableSelect from "react-select/creatable"
import Axios from "axios"
import "./View.css"
import Header from ".//Header"
import { toast } from "react-toastify"
import makeAnimated from "react-select/animated"

const View = () => {
  const animatedComponents = makeAnimated()
  const Groups = ["admin", "project manager", "project lead", "team member", "devops"]
  const [user, setUser] = useState("")
  const { email, setEmail } = useState("")
  const { password, setPassword } = useState("")
  const { usergroup, setUserGroup } = useState("")
  const { status, setStatus } = useState("")
  const { username } = useParams()
  const { state, setState } = useState("")
  const { show, setShow } = useState("")
  const [selectedOption, setSelectedOption] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    Axios.get(`http://localhost:5000/api/get/${username}`).then(response => setUser({ ...response.data[0] }))
  }, [username])

  useEffect(() => {
    Axios.get("http://localhost:5000/api/getStatus").then(response => setShow({ ...response.data[0] }))
  }, [])

  const updateUser = e => {
    //update codes
    e.preventDefault()
    if (!email || !password || !usergroup || !status) {
      toast.error("Please provide value for each input field!", { autoClose: 1000 })
    } else {
      Axios.put(`http://localhost:5000/api/update/${username}`, {
        email,
        password,
        usergroup,
        status
      }).then(() => {
        setState({ email: "", password: "", userGroup: "", status: "" })
      })
    }

    navigate("/mainmenu")
  }
  const handleStatus = e => {
    setStatus(e.target.value)
    console.log(e.target.value)
  }

  const handleChange = selectedOption => {
    setSelectedOption(selectedOption)
    //setUserGroup(selectedOption)
    console.log(selectedOption)

    selectedOption.forEach(option => {
      const value = option.value
      setUserGroup([...usergroup, value])
      console.log(usergroup)
    })
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
            <strong>Username:</strong>
            <span>{user.username}</span>
            <br />
            <br />
            <strong>Email:</strong>
            <span>{user.email}</span>
            <br />
            <br />
            <strong>UserGroup:</strong>
            <span>{user.usergroup}</span>
            <br />
            <br />
            <strong>Status:</strong>
            <span>{user.status}</span>
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
                setUser({ username: event.target.value })
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
                setEmail({ email: event.target.value })
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
                setPassword({ password: event.target.value })
              }}
              required
            />
            <label htmlFor="usergroup">User Group</label>
            {
              <CreatableSelect
                options={Groups.map(data => {
                  return { label: data, value: data }
                })}
                components={animatedComponents}
                onChange={handleChange}
                isMulti
                value={selectedOption}
              />
            }
            <label htmlFor="status">Status</label>
            <select name="status" id="status" value={status || ""} onChange={handleStatus}>
              <option hidden value="default">
                Select an option
              </option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
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
