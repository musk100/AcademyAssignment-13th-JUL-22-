import React, { useState, useEffect } from "react"
import CreatableSelect from "react-select/creatable"
import { useNavigate, Link } from "react-router-dom"
import "./AddUser.module.css"
import Axios from "axios"
import { toast } from "react-toastify"
import makeAnimated from "react-select/animated"
import Header from ".//Header"

const AddEdit = () => {
  const animatedComponents = makeAnimated()
  const Groups = ["admin", "project manager", "project lead", "team member", "devops"]
  const [state, setState] = useState("")
  const [user, setUser] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [usergroup, setUserGroup] = useState([])
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
    if (!username || !email || !password || !usergroup || !status) {
      toast.error("Please provide value for each input field!", { autoClose: 1000 })
    } else {
      Axios.post("http://localhost:5000/api/post", {
        username,
        email,
        password,
        usergroup,
        status
      })
        .then(() => {
          setState({ username: "", email: "", password: "", usergroup: [], status: "" })
        })
        .catch(err => toast.error(err.response.data))
    }
    if (username && password && email && usergroup && status) {
      toast.success("User Created Successfully!", { autoClose: 1000 })
      //clear all input values if create user is successful
      setUsername("")
      setEmail("")
      setPassword("")
      setSelectedOption("")
      setStatus("")
    }
  }

  useEffect(() => {
    Axios.get(`http://localhost:5000/api/get/${username}`).then(response => setUser({ ...response.data[0] }))
  })

  return (
    <>
      <Header />
      <div style={{ marginTop: "100px" }}>
        <h2>Create User</h2>
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
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email ..."
            value={email || ""}
            onChange={event => {
              setEmail(event.target.value)
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
              setPassword(event.target.value)
            }}
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
          <input type="submit" value={"Save"} />
          <Link to="/mainMenu">
            <input type="button" value="Go Back" />
          </Link>
        </form>
      </div>
    </>
  )
}

export default AddEdit
