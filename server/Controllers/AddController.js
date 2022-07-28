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
    const { username, email, password, usergroup, status } = request.body
    const groupStr = usergroup.toString()
    bcrypt.hash(password, saltRounds, function (err, hash) {
      const sqlInsert = "INSERT INTO taskmanagement_db (username, email, password, usergroup, status) VALUES ?"
      const values = [[username, email, hash, groupStr, status]]
      connection.query(sqlInsert, [values], function (error, result) {
        if (error) {
          console.log(error.errno)
        } else {
          console.log(groupStr.split(","))
          usergroup.forEach(key => {
            console.log(key)
            const sqlUpdate = "INSERT INTO usergroups (username, usergroup) VALUES (?, ?)"
            connection.query(sqlUpdate, [username, key], (error, result) => {
              if (error) {
                console.log(error)
              } else {
                console.log(result)
              }
            })
          })
          response.send({
            message: "Table Data",
            result: result
          })
        }
      })
    })
  })
  /*Add User to Group */
  // app.post("/api/postUsername", (request, response) => {
  //   const { username, usergroup } = request.body
  //   const groupStr = usergroup.toString()
  // })
}

module.exports = Add
