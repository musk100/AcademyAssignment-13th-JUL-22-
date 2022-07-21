const connection = require("../config/Database")
const bcrypt = require("bcrypt")
const saltRounds = 4

const update = async function (app) {
  //Edit User
  app.get("/api/get/:username", (request, response) => {
    const { username } = request.params
    const sqlGet = "SELECT * FROM taskmanagement_db WHERE username = ?"
    connection.query(sqlGet, [username], (error, result) => {
      if (error) {
        console.log(error)
      }
      response.send(result)
    })
  })

  //Update User
  app.put("/api/update/:username", (request, response) => {
    const { username } = request.params
    const { email, usergroup, status } = request.body
    console.log(request.body)
    const groupStr = usergroup.toString()
    const sqlUpdate = "UPDATE taskmanagement_db SET email = ?, usergroup = ?, status = ? WHERE username = ?"
    connection.query(sqlUpdate, [email, groupStr, status, username], (error, result) => {
      console.log(sqlUpdate)
      if (error) {
        console.log(error)
      } else {
        console.log(result)
      }
      console.log("Update Success!")
    })
  })
  app.put("/api/updated/:username", (request, response) => {
    const { username } = request.params
    const { password } = request.body
    console.log(request.body)
    const sqlUpdate = "UPDATE taskmanagement_db SET password = ? WHERE username = ?"
    bcrypt.hash(password, saltRounds, function (err, hash) {
      connection.query(sqlUpdate, [hash, username], (error, result) => {
        if (error) {
          console.log(error)
        } else {
          console.log(result)
          console.log("Update Success!")
        }
      })
    })
  })
}

module.exports = update
