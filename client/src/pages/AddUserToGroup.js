import React, { useState, useEffect } from "react"
import CreatableSelect from "react-select/creatable"
import { Link } from "react-router-dom"
import "./AddUser.module.css"
import Axios from "axios"
import { toast } from "react-toastify"
import makeAnimated from "react-select/animated"
import Header from ".//Header"
import "./View.css"

const View = () => {
  const animatedComponents = makeAnimated()
  const [user, setUser] = useState("")
  const [groups, setGroups] = useState("")
  const [username, setUsername] = useState("")
  const [usergroup, setUserGroup] = useState([])
  const [password, setPassword] = useState("")
  const [status, setStatus] = useState("")
  const [dropdown, setDropdown] = useState([])
  const [selectedOption, setSelectedOption] = useState([])

  const handleChange = selectedOption => {
    setSelectedOption(selectedOption)
    console.log(selectedOption)

    selectedOption.forEach(option => {
      const value = option.value
      setUserGroup([...usergroup, value])
      console.log(usergroup)
    })
  }

  useEffect(() => {
    const getGroup = async () => {
      const response = await Axios.get("http://localhost:5000/api/getGrouping")
      console.log(response)
      setDropdown(response.data)
    }
    getGroup()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      if (!usergroup) {
        toast.error("Please provide value for each input field!", { autoClose: 1000 })
      } else {
        const userGrouping = await Axios.put("http://localhost:5000/api/updateGroup", {
          username,
          password,
          usergroup,
          status
        })
          .then(() => {
            setUser({ username: "", password: "", usergroup: [], status: "" })
          })
          .catch(err => toast.error(err.response.data), { autoClose: 700 })
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
    } catch (e) {
      console.log("There was a problem")
    }
  }

  return (
    <>
      <Header />
      <div style={{ marginTop: "100px" }}>
        <h2>Add User to Group</h2>
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
          <input type="submit" value={username ? "Update" : "Save"} />
          <Link to="/mainMenu">
            <input type="button" value="Go Back" />
          </Link>
        </form>
      </div>
    </>
  )
}

export default View
