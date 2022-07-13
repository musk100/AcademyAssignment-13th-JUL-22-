const connection = require("../config/Database")

const Add = function (app) {
  app.post("/api/post", (request, response) => {
    const { username, email, password, usergroup } = request.body
    const sqlInsert = "INSERT INTO taskmanagement_db (username, email, password, usergroup) VALUES (?, ?, ?, ?)"
    connection.query(sqlInsert, [username, email, password, usergroup], (error, result) => {
      if (error) {
        console.log(error)
      }
    })
  })
}

module.exports = Add
