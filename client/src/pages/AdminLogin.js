import React, { useState, useEffect } from "react"
import { Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import "./AdminLogin.css"
import Axios from "axios"
import { toast } from "react-toastify"

const AdminLogin = () => {
  const [user, setUser] = useState({
    username: "",
    password: ""
  })

  const [show, setShow] = useState(false)
  const [msg, setMsg] = useState("")

  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const response = await Axios.post("http://localhost:5000/login", user)
      console.log(response)
      localStorage.setItem("login", response.data.login)
      setShow(response.data.login)
      if (response.data.login) {
        toast.success("Login Successful!")
        setMsg(response.data.msg)
      }
    } catch (e) {
      console.log("There was a problem")
    }
  }

  useEffect(() => {
    if (show) {
      navigate("/mainmenu")
    }
  }, [show])

  Axios.defaults.withCredentials = true

  useEffect(() => {
    const checkLogin = async () => {
      const response = await Axios.get("http://localhost:5000/login")
      console.log(response)
      if (response.data.user) {
        navigate("/mainmenu")
      }
    }
  }, [])

  const userInput = event => {
    const { name, value } = event.target
    setUser(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  return (
    <>
      <div className="topnav" id="myTopnav">
        <a className="active">Login</a>
      </div>
      <br />
      <div>
        <Form onSubmit={handleSubmit} autoComplete="off">
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <br />
            <Form.Control type="text" placeholder="Enter username" name="username" value={user.username} onChange={userInput} required />
            <br />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <br />
            <Form.Control type="password" placeholder="Password" maxLength="12" name="password" value={user.password} onChange={userInput} required />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  )
}

export default AdminLogin
