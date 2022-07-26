const connection = require("../config/Database")

/*To create a new group in CreateUserGroup.js page */
const AddGroup = function (app) {
  app.post("/api/postGroup", (request, response) => {
    const { usergroup } = request.body
    const sqlInsert = "INSERT INTO groupname (usergroup) VALUES (?)"
    connection.query(sqlInsert, [usergroup], function (error, result) {
      console.log(result)
      if (error) {
        console.log(error)
        return
      } else {
        response.send(result)
        console.log(usergroup)
      }
    })
  })
}

module.exports = AddGroup
