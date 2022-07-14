// const { request, response } = require("express")
// const express = require("express")
// const router = express.Router()
// const Yup = require("yup") //Javascript schema builder for value parsing and validation

// const formSchema = Yup.object({
//   username: Yup.string().required("Username required").min(6, "Username too short").max(28, "Username too long!"),
//   password: Yup.string().required("password required").min(8, "Password too short").max(12, "Password too long!")
// })

// router.post("/login", (request, response) => {
//   const formData = request.body
//   formSchema
//     .validate(formData)
//     .catch(err => {
//       response.status(422).send()
//       console.log(err.error)
//     })
//     .then(valid => {
//       if (valid) {
//         console.log("form is good")
//       }
//     })
// })
// module.exports = router
