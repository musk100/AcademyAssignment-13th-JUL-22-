const connection = require("../config/Database")

const disable = function (app) {
  app.delete("/api/remove/:id", (request, response) => {
    const { id } = request.params
    const sqlRemove = "DELETE FROM taskmanagement_db WHERE id = ?"
    connection.query(sqlRemove, id, (error, result) => {
      if (error) {
        console.log(error)
      }
    })
  })
}

module.exports = disable
