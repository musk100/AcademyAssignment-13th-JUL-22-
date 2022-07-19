const connection = require("../config/Database")

const disable = function (app) {
  app.get("/api/getStatus", (request, response) => {
    const { username, status } = request.params
    const sqlGet = "SELECT * FROM taskmanagement_db WHERE username = ? AND status = ?"
    connection.query(sqlGet, [username, status], (error, result) => {
      if (error) {
        console.log(error)
      }
      if (status == "inactive") {
        response.send("Account status is inactive")
        console.log(result)
      } else if (status == "active") {
        response.send("Account status is active")
        console.log(result)
      }
    })
  })
}
module.exports = disable
