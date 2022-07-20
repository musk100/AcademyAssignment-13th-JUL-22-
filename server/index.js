const express = require("express")
const connection = require("./config/Database")
const app = express()
const cors = require("cors")

const AddController = require("./Controllers/AddController")
const CheckGroup = require("./Controllers/CheckGroup")
const LoginController = require("./Controllers/LoginController")
const UpdateController = require("./Controllers/UpdateController")

app.use(express.json())

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
)

app.get("/api/get", (request, response) => {
  const sqlGet = "SELECT * FROM taskmanagement_db"
  connection.query(sqlGet, (error, result) => {
    response.send(result)
  })
})

app.get("/", (request, response) => {
  // const sqlInsert = "INSERT INTO taskmanagement_db (username, email, password, usergroup) VALUES ('john doe', 'johndoe@gmail.com', 'username', 'project manager')"
  // connection.query(sqlInsert, (error, result) => {
  //   console.log("error", error)
  //   console.log("result", result)
  // response.send("Hello Express")
  // })
})

AddController(app)
CheckGroup(app)
LoginController(app)
UpdateController(app)

app.listen(5000, () => {
  console.log("Server is running on port 5000")
})

module.export = app
