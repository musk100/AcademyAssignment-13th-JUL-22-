const connection = require("../config/Database")
const strip = require("strip")
const bcrypt = require("bcrypt")
const validator = require("validator")
const { checkGroup } = require("../Controllers/CheckGroupController")

function checkUsernameFormat(username) {
  var whitespace = /^\S*$/
  if (whitespace.test(username)) {
    return true
  } else {
    return false
  }
}

const CreateTaskAPI = async (request, response) => {
  try {
    let jsonData = request.body
    // declare variables for Login and CreateTask
    let createTaskInfo = {}
    let Task_plan = ""
    let Task_notes = ""

    // setting JSON keys to lower case
    for (let key in jsonData) {
      createTaskInfo[key.toLowerCase()] = jsonData[key]
    }

    let username = createTaskInfo.username
    let Task_name = createTaskInfo.task_name
    let Task_description = createTaskInfo.task_description
    let Task_app_Acronym = createTaskInfo.app_acronym
    let Task_state = "Open"

    // call required promises
    const Login = await login(createTaskInfo)
    // if user is authenticated (success)
    if (Login.code === 200) {
      console.log("login")
      try {
        const PermitCreate = await checkAppPermitCreate(Task_app_Acronym)
        console.log(PermitCreate)
        // Check permit create if user is in app permit create (success)
        if (PermitCreate.code === 200) {
          console.log("permit create")
          let permitcreate = PermitCreate.permitCreate
          try {
            const UserGroup = await checkGroup(username, permitcreate)
            console.log("usergroup")
            if (UserGroup) {
              console.log("right usergroup")
              try {
                const success = await createTask(Task_name, Task_description, Task_notes, Task_app_Acronym, Task_plan, Task_state, username)
                console.log("create task")
                // Create Task if no create task validation errors (success)
                if (success.code === 200) {
                  console.log("Task added successfully")
                  response.send(success)
                }
              } catch (error) {
                // Create Task error (fail)
                response.send(error)
              }
            }
          } catch (error) {
            // User Group === App Permit Create error (fail)
            response.send(error)
          }
        }
      } catch (error) {
        // Get App Permit Create error(fail)
        response.send(error)
      }
    }
  } catch (error) {
    // Login error (fail)
    response.send(error)
  }
}

// Login (PROMISE)
function login(jsonData) {
  return new Promise((resolve, reject) => {
    if (!jsonData.hasOwnProperty("username") || !jsonData.hasOwnProperty("password") || !jsonData.hasOwnProperty("task_name") || !jsonData.hasOwnProperty("task_description") || !jsonData.hasOwnProperty("app_acronym")) {
      return reject({ code: 4008 })
    }
    let username = jsonData.username
    let password = jsonData.password
    let email = ""
    let status = ""
    let usergroup = ""

    // login validation
    username = strip(username)
    password = strip(password)

    // check username for empty field
    if (validator.isEmpty(username)) {
      return reject({ msg: "Empty Username", code: 4006 })
    }

    // check username (whitespace)
    if (!checkUsernameFormat(username)) {
      return reject({ msg: "Empty Password", code: 4006 })
    }

    if (username && password) {
      const checkLogin = `SELECT email, password, usergroup, status FROM taskmanagement_db WHERE username = ?`
      connection.query(checkLogin, [username], function (error, rows) {
        if (error) reject (error)

        if (rows.length > 0) {
          const passwordCheck = bcrypt.compareSync(password, rows[0].password)

          // if valid password (match hash password  in database)
          if (passwordCheck) {
            const checkUser = `SELECT username, password, email, usergroup, status FROM taskmanagement_db WHERE taskmanagement_db.username = ?`

            connection.query(checkUser, [username], function (error, rows) {
              if (error) reject (error)

              if (rows.length > 0) {
                // get user details from database
                email = rows[0].email
                status = rows[0].status
                usergroup = rows[0].usergroup

                //check if user is inactive (deny login)
                if (status == "Inactive") {
                  return reject({ msg: "Permission Denied", code: 4002})
                }
                // if user is active (approve login)
                else if (status == "Active") {
                  const userInfo = {
                    username: username, 
                    email: email,
                    status: status,
                    usergroup: usergroup
                  }
                  return resolve({ code: 200 })
                }
              } else {
                return reject({ msg: "Invalid Login", code: 4001 })
              }
            })
          } else {
            return reject({ msg: "Invalid Login", code: 4001 })
          }
        } else {
          return reject({ msg: "Invalid Login", code: 4001 })
        }
      })
    }
  })
}

// Create Task (Promise)
function createTask(Task_name, Task_description, Task_notes, Task_app_Acronym, Task_plan, Task_state, username) {
  return new Promise((resolve, reject) => {
    let Task_creator = username
    let Task_owner = username
    let rNumber = 0
    let taskID = ""
    let formattedTaskNotes = ""

    console.log("1" + Task_name)
    console.log("2" + Task_description)
    console.log("3" + Task_notes)
    console.log("4" + Task_app_Acronym)
    console.log("5" + Task_plan)
    console.log("6" + Task_state)
    console.log("7" + Task_creator)
    console.log("8" + Task_owner)

    // new date object
    let date_ob = new Date()

    // current date
    // adjust 0 before single digit date
    let day = ("0" + date_ob.getDate()).slice(-2)

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2)

    // current year
    let year = date_ob.getFullYear()

    // current hours
    let hours = date_ob.getHours()

    // current minutes
    let minutes = date_ob.getMinutes()

    // current seconds
    let seconds = date_ob.getSeconds()

    // current datetime (DD-MM-YYYY HH:MM:SS format)
    let datetime = day + "-" + month + "-" + year + " " + hours + ":" + minutes + ":" + seconds

    // remove all leading and trailing spaces and tabs
    Task_name = strip(Task_name)
    Task_description = strip(Task_description)
    Task_notes = strip(Task_notes)

    // check for empty task name
    if (validator.isEmpty(Task_name)) {
      return reject({ msg: "Empty task name", code: 4006 })
    }

    // if task name is not empty
    else {
      // check for duplicated task name
      const checkTaskName = `SELECT *
                             FROM task
                             WHERE Task_name = ?`
      con.query(checkTaskName, [Task_name], function (error, rows) {
        if (error) reject(error)
        // if task name exists in database (duplicated task name)
        if (rows.length > 0) {
          return reject({ msg: "Duplicated Taskname", code: 4003 })
        }

        // if task name does not exist in database (can use this task name)
        else {
          // check for empty task app acronym
          if (validator.isEmpty(Task_app_Acronym)) {
            return reject({ msg: "Empty Task App Acronym", code: 4006 })
          }

          // check for empty task plan
          // if task plan is empty, set its value as null
          if (Task_plan === "") {
            Task_plan = null
          }

          // check for existing task
          const checkTask = `SELECT * 
          FROM task 
          WHERE Task_app_Acronym = ?`
          con.query(checkTask, [Task_app_Acronym], function (err, rows) {
            if (err) reject(err)
            // if task exists in database
            if (rows.length > 0) {
              // get app rnumber
              const getAppRNumber = `SELECT App_Rnumber
                  FROM application
                  WHERE App_Acronym = ?`

              con.query(getAppRNumber, [Task_app_Acronym], function (err, rows) {
                if (err) reject(err)

                if (rows.length > 0) {
                  // get latest app rnumber and create task id (app_acronym and app rnumber)
                  rNumber = rows[0].App_Rnumber + 1
                  taskID = Task_app_Acronym + "_" + rNumber
                } else {
                  return reject({ msg: "Invalid Task App Acronym", code: 4005 })
                }

                // check for added task notes
                if (Task_notes) {
                  // format task notes with header (datetime, task state, task owner)
                  formattedTaskNotes = "[" + datetime + "\tTask State: " + Task_state + "\t Task Owner: " + Task_owner + "]\n" + Task_notes + "\n"

                  // insert task with formatted task notes into task table
                  const addTask = `INSERT INTO task VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, now())`
                  con.query(addTask, [Task_name, Task_description, formattedTaskNotes, taskID, Task_plan, Task_app_Acronym, Task_state, Task_creator, Task_owner], console.log("Created Task with task notes."))

                  // insert into task notes table
                  const addTaskNotes = `INSERT INTO tasknotes (Task_name, Task_plan, Task_app, Task_notes, Task_state, Task_owner, Task_updateDate) VALUES (?, ?, ?, ?, ?, ?, now())`
                  con.query(addTaskNotes, [Task_name, Task_plan, Task_app_Acronym, Task_notes, Task_state, Task_owner], console.log("Added task notes."))

                  // update latest app rnumber in application table
                  const updateAppRNumber = `UPDATE application SET App_Rnumber = ? WHERE App_Acronym = ?`
                  con.query(updateAppRNumber, [rNumber, Task_app_Acronym], console.log("Updated App rnumber."))
                }

                // if task notes is empty (user did not write anything)
                else {
                  // insert task with formatted task notes into task table
                  const addTask = `INSERT INTO task VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, now())`
                  con.query(addTask, [Task_name, Task_description, Task_notes, taskID, Task_plan, Task_app_Acronym, Task_state, Task_creator, Task_owner], console.log("Created Task with no task notes."))

                  // update latest app rnumber in application table
                  const updateAppRNumber = `UPDATE application SET App_Rnumber = ? WHERE App_Acronym = ?`
                  con.query(updateAppRNumber, [rNumber, Task_app_Acronym], console.log("Updated App rnumber."))
                }

                // send to frontend
                const taskInfo = {
                  Task_name: Task_name,
                  Task_description: Task_description,
                  Task_notes: Task_notes,
                  Task_id: taskID,
                  Task_plan: Task_plan,
                  Task_app_Acronym: Task_app_Acronym,
                  Task_state: Task_state,
                  Task_creator: Task_creator,
                  Task_owner: Task_owner,
                }

                return resolve({ code: 200, Task_id: taskID })
              })
            }

            // if no task exists in database (first task)
            else {
              // get app rnumber
              const getAppRNumber = `SELECT App_Rnumber
                           FROM application
                           WHERE App_Acronym = ?`

              con.query(getAppRNumber, [Task_app_Acronym], function (err, rows) {
                if (err) reject(err)

                if (rows.length > 0) {
                  // get app rnumber and create task id (app_acronym and app rnumber)
                  rNumber = rows[0].App_Rnumber
                  taskID = Task_app_Acronym + "_" + rNumber
                } else {
                  return reject({ msg: "Invalid Task App Acronym", code: 4005 })
                }

                // check for added task notes
                if (Task_notes) {
                  // format task notes with header (datetime, task state, task owner)
                  formattedTaskNotes = "[" + datetime + "\tTask State: " + Task_state + "\t Task Owner: " + Task_owner + "]\n" + Task_notes + "\n"

                  // insert task with formatted task notes into task table
                  const addTask = `INSERT INTO task VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, now())`
                  con.query(addTask, [Task_name, Task_description, formattedTaskNotes, taskID, Task_plan, Task_app_Acronym, Task_state, Task_creator, Task_owner, planColor], console.log("Created Task with task notes."))

                  // insert into task notes table
                  const addTaskNotes = `INSERT INTO tasknotes (Task_name, Task_plan, Task_app, Task_notes, Task_state, Task_owner, Task_updateDate) VALUES (?, ?, ?, ?, ?, ?, now())`
                  con.query(addTaskNotes, [Task_name, Task_plan, Task_app_Acronym, Task_notes, Task_state, Task_owner], console.log("Added task notes."))
                }

                // if task notes is empty (user did not write anything)
                else {
                  // insert task with formatted task notes into task table
                  const addTask = `INSERT INTO task VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, now())`
                  con.query(addTask, [Task_name, Task_description, Task_notes, taskID, Task_plan, Task_app_Acronym, Task_state, Task_creator, Task_owner, planColor], console.log("Created Task with no task notes."))
                }
                // send to frontend
                const taskInfo = {
                  Task_name: Task_name,
                  Task_description: Task_description,
                  Task_notes: Task_notes,
                  Task_id: taskID,
                  Task_plan: Task_plan,
                  Task_app_Acronym: Task_app_Acronym,
                  Task_state: Task_state,
                  Task_creator: Task_creator,
                  Task_owner: Task_owner,
                }

                return resolve({ code: 200, Task_id: taskID })
              })
            }
          })
        }
      })
    }
  })
}

// Check App Permit Create (Promise)
function checkAppPermitCreate(application) {
  return new Promise((resolve, reject) => {
    // check empty task app acronym
    if (validator.isEmpty(application)) {
      return reject({ msg: "empty App", code: 4006 })
    }

    let permitCreate = ""
    const appPermitCreate = `SELECT * FROM application WHERE App_Acronym = ?`
    connection.query(appPermitCreate, [application], function (error, rows) {
      if (error) reject(error)
      if (rows.length > 0) {
        permitCreate = rows[0].App_permit_Create
        return resolve({ code: 200, permitCreate: permitCreate })
      } else {
        return reject({ msg: "Invalid application", code: 4005 })
      }
    })
  })
}

module.exports = { CreateTaskAPI }
