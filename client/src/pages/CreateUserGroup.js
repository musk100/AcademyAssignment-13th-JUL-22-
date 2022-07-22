import React, { useState, useEffect } from "react"
import Axios from "axios"
import { toast } from "react-toastify"
import Header from ".//Header"
import "./CreateUserGroup.css"

function CreateUserGroup() {
  const [creategroup, setCreateGroup] = useState("")
  const [usergroup, setUserGroup] = useState([])
  const [username, setUsername] = useState("")

  const handleSubmit = e => {
    e.preventDefault()
    if (!usergroup) {
      toast.error("Please key in a valid input", { autoClose: 1000 })
    } else {
      Axios.post("http://localhost:5000/api/posts", usergroup)
    }
  }

  return (
    <>
      <Header />
      <div></div>
    </>
  )
}

export default CreateUserGroup
