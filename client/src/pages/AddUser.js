import React, { useState } from "react"
import CreatableSelect from "react-select/creatable"
import { useNavigate, Link } from "react-router-dom"
import "./AddUser.module.css"
import axios from "axios"
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

  // const loadOptions = (searchValue, callback) => {
  //   setTimeout(() => {
  //     const filteredOptions = Groups.filter(option => option.label.toLowerCase().includes(searchValue.toLowerCase()))
  //     console.log("loadOptions", searchValue, filteredOptions)
  //     callback(filteredOptions)
  //   }, 500)
  // }

  const navigate = useNavigate()

  const handleChange = (selectedOption, actionMeta) => {
    console.log("handleChange", selectedOption, actionMeta)
  }

  const handleInputChange = (inputValue, actionMeta) => {
    console.log("handleInputChange", inputValue, actionMeta)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!username || !email || !password || !usergroup) {
      toast.error("Please provide value for each input field!", { autoClose: 2000 })
    } else {
      axios
        .post("http://localhost:5000/api/post", {
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
          <label htmlFor="usergroup">
            User Group
            <CreatableSelect styles={colorStyles} components={animatedComponents} onChange={handleChange} options={Groups} onInputChange={handleInputChange} isMulti />
          </label>
          {/* value type="text" id="usergroup" name="usergroup" placeholder="User Group ..." value={usergroup || ""}
          onChange=
          {event => {
            setUserGroup(event.target.value)
          }} */}
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
