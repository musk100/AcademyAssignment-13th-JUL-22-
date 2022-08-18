const express = require("express")
const connection = require("./config/Database")
const app = express()
const cors = require("cors")

const AddController = require("./Controllers/AddController")
const CheckGroupController = require("./Controllers/CheckGroupController")
const LoginController = require("./Controllers/LoginController")
const UpdateController = require("./Controllers/UpdateController")
const AddGroupController = require("./Controllers/AddGroupController")
const GetApplication = require("./Controllers/GetApplication")
const GetPlan = require("./Controllers/Plan")
const GetTask = require("./Controllers/Task")
const Tasked = require("./restAPI/CreateTask")

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

//call controller functions
AddController(app)
CheckGroupController(app)
LoginController(app)
UpdateController(app)
AddGroupController(app)
GetApplication(app)
GetPlan(app)
GetTask(app)
Tasked(app)

app.listen(5000, () => {
  console.log("Server is running on port 5000")
})

module.export = app
