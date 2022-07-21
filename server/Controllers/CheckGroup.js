const connection = require("../config/Database")

const Checkgroup = function (app) {
  app.get("/api/getGroup", (request, response) => {
    const { username } = request.query
    const sqlGet = "SELECT usergroup FROM taskmanagement_db WHERE username = ?"
    connection.query(sqlGet, [username], (error, result) => {
      if (error) {
        console.log(error)
      }
      // console.log(result.user)
      else if (result[0].usergroup === "admin") {
        response.send(true)
      } else {
        response.send(false)
      }
      // else if (result[0].isAdmin === "1") {
      //   response.send(true)
      // } else {
      //   response.send(false)
      // }
    })
  })
}
module.exports = Checkgroup
