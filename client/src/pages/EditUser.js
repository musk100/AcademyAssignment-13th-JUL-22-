import React, { useState, useEffect } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import "./AddUser.module.css"
import Axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import Header from ".//Header"

const initialState = {
  name: "",
  email: "",
  password: "",
  usergroup: ""
}

const EditUser = () => {
  const [state, setState] = useState({})

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [usergroup, setUserGroup] = useState("")
  const navigate = useNavigate()
  const { id } = useParams()

  // useEffect(() => {
  //   if (id) {
  //     updateSingleUser(id)
  //   }
  // }, [id])

  // const handleSubmit = e => {
  //   let { name, value } = e.target
  //   setState({
  //     ...state,
  //     [name]: value
  //   })
  // }

  const updateSingleUser = async id => {
    const response = await Axios.put(`http://localhost:5000/api/update/${id}`)
    if (response.status === 200) {
      setState({ ...response.data[0] })
      navigate("/mainmenu")
    }
  }

  return (
    <>
      <Header />
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
          onSubmit={updateSingleUser}
        >
          <label htmlFor="username">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name ..."
            value={username}
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
            value={email}
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
            value={password}
            maxLength="12"
            onChange={event => {
              setPassword(event.target.value)
            }}
          />
          <label htmlFor="usergroup">User Group</label>
          <input
            type="text"
            id="usergroup"
            name="usergroup"
            placeholder="User Group ..."
            value={usergroup}
            onChange={event => {
              setUserGroup(event.target.value)
            }}
          />
          <input type="submit" value={id ? "Update" : "Save"} />
          <Link to="/mainMenu">
            <input type="button" value="Go Back" />
          </Link>
        </form>
      </div>
    </>
  )
}

export default EditUser
