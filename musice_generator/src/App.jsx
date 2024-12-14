import { Route, Routes } from "react-router-dom"
import Register from "./components/register"
import Home from "./components/home"
import LoginPage from "./components/LoginPage"


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Register />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </div>
  )
}

export default App