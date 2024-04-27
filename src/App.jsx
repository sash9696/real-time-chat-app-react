import { BrowserRouter, Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route exact path='/' element = {<Start/>}/>
            <Route  path='/register' element = {<Register/>}/>
            <Route  path='/login' element = {<Login/>}/>
            <Route  path='/chats' element = {<Home/>}/>
        </Routes>


      </BrowserRouter>
    </div>
  )
}