const connection = require("../config/Database")

const update = function (app) {
  //Edit User
  app.get("/api/get/:id", (request, response) => {
    const { id } = request.params
    const sqlGet = "SELECT * FROM taskmanagement_db WHERE id = ?"
    connection.query(sqlGet, [id], (error, result) => {
      if (error) {
        console.log(error)
      }
      response.send(result)
    })
  })

  //Update User
  app.put("/api/update/:id", (request, response) => {
    const { id } = request.params
    const { username, email, password, usergroup } = request.body
    const sqlUpdate = "UPDATE taskmanagement_db SET username = ?, email = ?, password = ?, usergroup = ? WHERE id = ?"
    connection.query(sqlUpdate, [username, email, password, usergroup, id], (error, result) => {
      if (error) {
        console.log(error)
      } else {
        console.log(result)
      }
    })
  })
}

module.exports = update
