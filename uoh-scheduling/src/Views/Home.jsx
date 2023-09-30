import {BrowserRouter, Routes, Route} from "react-router-dom"
import Navbar from "../layout/Navbar.jsx"
import Login from "../Views/Login"
import React from 'react'
import '../css/Home.css'

function Home() {  
  return (
	  <>
	  <div className='test'>
	  	<h1> HOLA </h1>
	  </div>
	  {/*
    <BrowserRouter>
	  <nav>
	  	<Navbar/>
	  </nav>
	  <main>
		<Routes>
			<Route exact path = "/" element={<Home/>}/>
			<Route path="/login" element={<Messages/>}/>
		</Routes>
	  </main>
    </BrowserRouter>
  */} </>
  )
}
export default Home;
