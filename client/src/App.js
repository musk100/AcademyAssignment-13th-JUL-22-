import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./App.css"
import AddEdit from "./pages/AddUser"
import Home from "./pages/Home"
import AdminLogin from "./pages/AdminLogin"
import View from "./pages/View"
import ChangePassword from "./pages/ChangePassword"
import Main from "./pages/Main"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position="top-center" />
        <Routes>
          <Route exact path="/mainmenu" element={<Home />} />
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/addUser" element={<AddEdit />} />
          <Route path="/update/:username" element={<View />} />
          <Route path="/changepassword" element={<ChangePassword />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
