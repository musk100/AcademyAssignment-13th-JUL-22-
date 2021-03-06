import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./App.css"
import AddEdit from "./pages/AddUser"
import Home from "./pages/Home"
import AdminLogin from "./pages/AdminLogin"
import View from "./pages/View"
import ChangePassword from "./pages/ChangePassword"
import User from "./pages/User"
import UserChangePassword from "./pages/UserChangePassword"
import UserChangeEmail from "./pages/UserChangeEmail"
import CreateUserGroup from "./pages/CreateUserGroup"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position="top-center" />
        <Routes>
          <Route exact path="/mainmenu" element={<Home />} />
          <Route path="/" element={<AdminLogin />} />
          <Route path="/addUser" element={<AddEdit />} />
          <Route path="/addUserGroup" element={<CreateUserGroup />} />
          <Route path="/update/:username" element={<View />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/userchangepassword" element={<UserChangePassword />} />
          <Route path="/userchangeemail" element={<UserChangeEmail />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
