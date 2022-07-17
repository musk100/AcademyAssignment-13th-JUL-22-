const connection = require("../config/Database")

const update = function (app) {
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
    const { email, password, usergroup } = request.body
    console.log(request.body)
    const sqlUpdate = "UPDATE taskmanagement_db SET email = ?, password = ?, usergroup = ? WHERE username = ?"
    connection.query(sqlUpdate, [email, password, usergroup, username], (error, result) => {
      if (error) {
        console.log(error)
      } else {
        console.log(result)
      }
    })
  })
}

module.exports = update
