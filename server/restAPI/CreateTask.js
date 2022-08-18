const connection = require("../config/Database")
const bcrypt = require("bcrypt")

const Tasked = function (app) {
  app.post("/api/create-new-task", (request, response) => {
    const { isProjectLead, task_Owner, App_Acronym, Task_name, Task_description, task_Notes, task_State } = request.body
    let { task_Plan } = request.body
    let { task_CreateDate } = request.body
    const username = request.body.username
    const password = request.body.password
    let app_Rno = result[0].App_Rnumber + 1
    const Task_id = `${App_Acronym}_${app_Rno}`
    const sqlQuery = "SELECT status, password FROM taskmanagement_db WHERE username = ?"
    connection.query(sqlQuery, [username], async (error, result) => {
      if (error) {
        console.log(error)
        return
      }
      if (!result.length) {
        console.log("Invalid Credentials!")
        response.send({ login: false })
        return
      }
      console.log(result[0].status)
      const isValid = await bcrypt.compare(password, result[0].password)
      //password matched
      if (isValid && result[0].status === "active") {
        const sqlData = "SELECT * FROM task WHERE Task_name = ?"
        connection.query(sqlData, [Task_name], (error, result) => {
          // console.log(result)
          if (result.length > 0) {
            console.log("Duplicate Task name!")
            const sqlTaskDuplicate = "update task set Task_description, Task_notes, Task_id, Task_plan, Task_app_Acronym, , Task_state, Task_creator, Task_owner "
          } else if (Task_name) {
            if (task_Plan === "") {
              task_Plan = null
            }
            const sqlUser = "SELECT username FROM taskmanagement_db WHERE username = ?"
            connection.query(sqlUser, [isProjectLead], (error, result) => {
              if (error) {
                console.log(error)
              } else {
                const sqlTask = "SELECT App_Rnumber FROM application WHERE App_Acronym = ?"
                connection.query(sqlTask, [App_Acronym], (error, result) => {
                  if (error) {
                    console.log(error)
                  } else {
                    const sqlInsert = "INSERT INTO task (Task_name, Task_description, Task_notes, Task_id, Task_plan, Task_app_Acronym, Task_state, Task_creator, Task_owner, Task_createDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, now())"
                    connection.query(sqlInsert, [Task_name, Task_description, task_Notes, Task_id, task_Plan, App_Acronym, task_State, isProjectLead, task_Owner, task_CreateDate], (error, result) => {
                      if (error) {
                        console.log(error)
                      } else {
                        response.send(result)
                        const sqlUpdate = "UPDATE application SET App_Rnumber = ? WHERE App_Acronym = ?"
                        connection.query(sqlUpdate, [app_Rno, App_Acronym], (error, result) => {
                          if (error) {
                            console.log(error)
                          } else {
                            console.log(result)
                          }
                        })
                      }
                    })
                  }
                })
              }
            })
          } else {
            console.log("Required fields empty")
          }
        })
      } else {
        console.log("Invalid Credentials!")
        response.send({ login: false })
      }
    })
  })
}

module.exports = Tasked
