import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./Views/Login"
import Home from "./Views/Home.jsx"
import React from 'react'
function App() {  
  return (
    <BrowserRouter>
    <Routes>
      <Route path = "/login" element={<Login/>}/>
      <Route path = "/" exact element={<Home/>}/>
    </Routes>
    </BrowserRouter>
   
  )
}
export default App
