const { request } = require("express")
const connection = require("../config/Database")
//how much time is needed to calculate a single BCrypt hash.
//The higher the 'saltRound', the more hashing rounds are done
//increasing the 'saltRound' by 1 doubles the necessary time
//the more time necessary, the more difficult brute-forcing decoding
const saltRounds = 10
//hashing password
const bcrypt = require("bcrypt")

const Add = function (app) {
  app.post("/api/post", (request, response) => {
    const { username, email, password, usergroup } = request.body
    bcrypt.hash(password, saltRounds, function (err, hash) {
      const sqlInsert = "INSERT INTO taskmanagement_db (username, email, password, usergroup) VALUES ?"
      const values = [[username, email, hash, usergroup]]
      connection.query(sqlInsert, [values], function (error, result, field) {
        if (error) throw error
        response.send({
          message: "Table Data",
          result: result
        })
      })
    })
  })

  app.get("/api/getGroup", (request, response) => {
    const sqlGet = "SELECT groupname FROM groups"
    connection.query(sqlGet, (error, result) => {
      response.send(result)
    })
  })
}

module.exports = Add
