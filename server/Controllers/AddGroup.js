const connection = require("../config/Database")

const AddGroup = function (app) {
  app.post("/api/posts", (request, response) => {
    const { username, usergroup } = request.body
    const groupStr = usergroup.toString()
    console.log("group str", groupStr)
    const sqlInsert = "INSERT INTO usergroups (username, usergroup) VALUES ?"
    const values = [[username, groupStr]]
    connection.query(sqlInsert, [values], function (error, result) {
      if (error) throw error
      else response.send(result)
    })
  })

  app.get("/api/getGroups", (request, response) => {
    const { usergroup } = request.query
    const sqlGet = "SELECT * FROM groups WHERE usergroup = ?"
    connection.query(sqlGet, [username], (error, result) => {
      if (error) {
        console.log(error)
      }
      // console.log(result.user)
      else if (result[0].usergroup === result) {
        response.send(result[0].usergroup)
      } else {
        response.send("Invalid")
      }
    })
  })
}

module.exports = AddGroup
