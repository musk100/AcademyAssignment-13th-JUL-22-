const connection = require("../config/Database")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const express = require("express")
const app = express()
const bcrypt = require("bcrypt")

const AddController = require("./AddController")

const login = async function (app) {
  app.use(express.json())
  app.use(cookieParser())
  app.use(bodyParser.urlencoded({ extended: true }))

  app.post("/login", (request, response) => {
    //login user
    const username = request.body.username
    const password = request.body.password
    const sqlQuery = "SELECT password FROM taskmanagement_db WHERE username = ?"
    connection.query(sqlQuery, [username], async (error, result, field) => {
      if (error) {
        console.log(error)
        return
      }
      if (!result.length) {
        console.log("Invalid Credentials!")
        response.end()
        return
      }
      const isValid = await bcrypt.compare(password, result[0].password)
      //password matched
      if (isValid) {
        response.send({ login: true, username: username })
        console.log("Successful login!")
      } else {
        response.send({ message: "Invalid Credentials" })
        console.log("Invalid Credentials!")
      }
    })
  })

  app.get("/login", (request, response) => {
    const { username } = request.params
    const sqlGet = "SELECT usergroup FROM taskmanagement_db WHERE username = ?"
    connection.query(sqlGet, [username], (error, result) => {
      if (error) throw error
      if (request.session.user) {
        response.send({ login: true, user: request.session.user })
        console.log(result)
      } else {
        response.send({ login: false })
      }
    })
  })
}

AddController(app)
module.exports = login
