const connection = require("../config/Database")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const bodyParser = require("body-parser")
const express = require("express")
const app = express()
const saltRounds = 10
//hasshing password
const bcrypt = require("bcrypt")

const login = function (app) {
  app.use(express.json())
  app.use(cookieParser())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(
    session({
      key: "userId",
      secret: "atanu",
      resave: false,
      saveUninitialized: false
    })
  )

  app.post("/login", (request, response) => {
    //login user
    const username = request.body.username
    const password = request.body.password
    //'${username}'
    const sqlQuery = "SELECT * FROM taskmanagement_db WHERE username = ? AND password = ?"

    connection.query(sqlQuery, [username, password], (error, result) => {
      if (error) throw error

      if (result.length > 0) {
        request.session.user = result
        response.send({ login: true, username: username })
      } else {
        console.log("Invalid username/password")
      }
      // if (error) {
      //   console.log(error)
      // } else {
      //   if (result.length > 0) {
      //     bcrypt.compare(password, result[0].password, (error, response) => {
      //       if (response) {
      //         request.session.user = result
      //         console.log(result)
      //         response.send({ login: true, username: username })
      //       } else {
      //         response.send({ login: false, msg: "Wrong Password" })
      //       }
      //     })
      //   }
      // }
    })

    app.get("/login", (request, response) => {
      if (request.session.user) {
        response.send({ login: true, user: request.session.user })
      } else {
        response.send({ login: false })
      }
    })
  })
}
module.exports = login
