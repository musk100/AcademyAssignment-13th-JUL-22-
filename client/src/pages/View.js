import React, { useState, useEffect } from "react"
import CreatableSelect from "react-select/creatable"
import { useNavigate, useParams, Link } from "react-router-dom"
import "./AddUser.module.css"
import Axios from "axios"
import { toast } from "react-toastify"
import makeAnimated from "react-select/animated"
import Header from ".//Header"
import "./View.css"

// const initialState = {
//   email: ""
// }

const View = () => {
  const animatedComponents = makeAnimated()
  const Groups = ["admin", "project manager", "project lead", "team member", "devops", "General"]
  const [user, setUser] = useState("")
  const { username } = useParams()
  const [usergroup, setUserGroup] = useState([])
  const { email } = user
  const [status, setStatus] = useState("")
  const [selectedOption, setSelectedOption] = useState([])

  const navigate = useNavigate()

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
  const handleSubmit = e => {
    e.preventDefault()
    if (!usergroup || !status) {
      toast.error("Please provide value for each input field!", { autoClose: 1000 })
    } else {
      Axios.put(`http://localhost:5000/api/update/${username}`, {
        email,
        usergroup,
        status
      })
        .then(() => {
          setUser({ email: "", usergroup: [], status: "" })
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
              value={user.username || ""}
              maxLength="12"
              onChange={event => {
                setUser({ ...user, username: event.target.value })
              }}
              required
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email ..."
              value={user.email || ""}
              onChange={event => {
                setUser({ ...user, email: event.target.value })
              }}
            />
            <label htmlFor="usergroup">User Group</label>
            {
              <CreatableSelect
                className="reactSelect"
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
