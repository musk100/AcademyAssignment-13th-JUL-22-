const connection = require("../config/Database")

const checkgroup = function (app) {
  app.get("/api/getStatus", (request, response) => {
    const { username, status } = request.params
    const sqlGet = "SELECT status FROM taskmanagement_db WHERE username = ?"
    connection.query(sqlGet, [username], (error, result) => {
      if (error) {
        console.log(error)
      }
      if (status === "inactive") {
        response.send("Account status is inactive")
        console.log(result)
      } else if (status === "active") {
        response.send("Account status is active")
        console.log(result)
      }
    })
  })
}
module.exports = checkgroup
