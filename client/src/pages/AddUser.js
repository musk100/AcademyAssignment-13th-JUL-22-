import React, { useState, useEffect } from "react"
import CreatableSelect from "react-select/creatable"
import { useNavigate, Link } from "react-router-dom"
import "./AddUser.module.css"
import Axios from "axios"
import { toast } from "react-toastify"
import makeAnimated from "react-select/animated"
import Header from ".//Header"

const initialState = {
  name: "",
  email: "",
  password: "",
  usergroup: ""
}

const AddEdit = () => {
  const animatedComponents = makeAnimated()
  const Groups = [
    {
      label: "Admin",
      value: "admin",
      color: "#FF8B00"
    },
    {
      label: "Project Lead",
      value: "projectlead",
      color: "#36B37E"
    },
    {
      label: "Project Manager",
      value: "projectmanager",
      color: "#0052CC"
    },
    {
      label: "Team Member",
      value: "teammember",
      color: "black"
    }
  ]
  const [state, setState] = useState(initialState)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [usergroup, setUserGroup] = useState("")
  const [APIData, setAPIData] = useState([])
  const [groups, setGroups] = useState([Groups])

  const navigate = useNavigate()

  const handleChange = Groups => {
    console.log(Groups)
  }

  // const handleInputChange = (inputValue, actionMeta) => {
  //   console.log("handleInputChange", inputValue, actionMeta)
  // }

  const handleSubmit = e => {
    e.preventDefault()
    if (!username || !email || !password || !usergroup) {
      toast.error("Please provide value for each input field!", { autoClose: 2000 })
    } else {
      Axios.post("http://localhost:5000/api/post", {
        username,
        email,
        password,
        usergroup
      })
        .then(() => {
          setState({ username: "", email: "", password: "", usergroup: "" })
        })
        .catch(err => toast.error(err.response.data))
    }

    setTimeout(() => navigate("/mainmenu"), 500)
  }

  const colorStyles = {
    control: styles => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      console.log("option", data, isFocused, isSelected, isDisabled)
      return { ...styles, color: data.color }
    },
    multiValue: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: data.color,
        color: "#fff"
      }
    },

    multiValueLabel: (styles, { data }) => {
      return {
        ...styles,
        color: "#fff"
      }
    },

    multiValueRemove: (styles, { data }) => {
      return {
        ...styles,
        color: "#fff",
        cursor: "pointer",
        ":hover": {
          color: "#fff"
        }
      }
    }
  }

  useEffect(() => {
    Axios.get(`http://localhost:5000/api/get/${username}`).then(response => setAPIData({ ...response.data[0] }))
  })

  useEffect(() => {
    Axios.get("http://localhost:5000/api/getGroup").then(response => setGroups({ ...response.data[0] }))
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
          {/* <CreatableSelect options={Groups} styles={colorStyles} components={animatedComponents} onChange={handleChange} isMulti /> */}
          <input
            type="text"
            id="usergroup"
            name="usergroup"
            placeholder="User Group ..."
            value={usergroup || ""}
            onChange={event => {
              setUserGroup(event.target.value)
            }}
          />
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
