import React, { useState, useEffect } from "react"
import CreatableSelect from "react-select/creatable"
import { Link } from "react-router-dom"
import "./AddUser.module.css"
import Axios from "axios"
import { toast } from "react-toastify"
import makeAnimated from "react-select/animated"
import Header from ".//Header"

const AddEdit = () => {
  const animatedComponents = makeAnimated()
  const [usergroup, setUserGroup] = useState([])
  const [dropdown, setDropdown] = useState([])
  const [state, setState] = useState("")
  const [groups, setGroups] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [status, setStatus] = useState(["active"])
  const [selectedOption, setSelectedOption] = useState([])
  const handleStatus = e => {
    setStatus(e.target.value)
    console.log(e.target.value)
  }

  const handleChange = selectedOption => {
    setSelectedOption(selectedOption)
    console.log(selectedOption)

    selectedOption.forEach(option => {
      const value = option.value
      setUserGroup([...usergroup, value])
      console.log(usergroup)
    })
  }

  function checkPassword(password) {
    const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,10}$/
    return re.test(password)
  }
  const handleSubmit = e => {
    e.preventDefault()
    if (!username || !password || !status) {
      toast.error("Please provide value for each input field!", { autoClose: 1000 })
    } else {
      const userGrouping = Axios.post("http://localhost:5000/api/post", {
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
      if (userGrouping) {
        const response = Axios.post("http://localhost:5000/api/postUsername", {
          username,
          usergroup
        }).then(() => {
          setGroups({ username: "", usergroup: [] })
        })
        if (response) {
          toast.success("User successfully added to group", { autoClose: 1000 })
        }
      }
    }
    if (username && password && status) {
      if (checkPassword(password) === true) {
        toast.success("User Created Successfully!", { autoClose: 1000 })
        //clear all input values if create user is successful
        setUsername("")
        setEmail("")
        setPassword("")
        setSelectedOption("")
        setStatus("")
      } else if (checkPassword(password) === false) {
        toast.error("Please include uppercase characters, special characters, numbers and alphabets in the password field", { autoClose: 2500 })
      }
    }
  }

  useEffect(() => {
    const getGroup = async () => {
      const response = await Axios.get("http://localhost:5000/api/getGrouping")
      console.log(response)
      setDropdown(response.data)
    }
    getGroup()
  }, [])

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
              className="reactSelect"
              options={dropdown.map(data => {
                return { label: data.usergroup, value: data.usergroup }
              })}
              components={animatedComponents}
              onChange={handleChange}
              isMulti
              defaultValue={selectedOption}
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
