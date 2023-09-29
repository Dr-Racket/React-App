import {BrowserRouter, Routes, Route} from "react-router-dom"
import Navbar from "../layout/navbar.jsx"
import Login from "../Views/Login"
import React from 'react'

function Home() {  
  return (
    <BrowserRouter>
	  <nav>
	  	<Navbar/>
	  </nav>
	  <main>
		<Routes>
			<Route exact path = "/" element={<Home/>}/>
			<Route path="/login" element={<Login/>}/>
		</Routes>
	  </main>
    </BrowserRouter>
   
  )
}
export default Home;
