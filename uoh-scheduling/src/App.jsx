import { BrowserRouter,  Routes, Route} from "react-router-dom"
import Navbar from "./layout/navbar.jsx"
import Login from "./Views/Login"
import React from 'react'
function App() {  
  return (
	  <>
		  <BrowserRouter>
				<Login />
		  </BrowserRouter>
	  </>
  )
}
export default App
