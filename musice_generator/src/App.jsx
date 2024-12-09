import { Route, Routes } from "react-router-dom"
import Login from "./components/login"
import Register from "./components/register"
import Home from "./components/home"


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </div>
  )
}

export default App