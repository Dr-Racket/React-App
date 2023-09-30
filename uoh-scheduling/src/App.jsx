import React, { useState, useEffect, useNavigate } from 'react'
import { BrowserRouter,  Routes, Route} from "react-router-dom"
import Navbar from "./layout/Navbar.jsx"
import Sidebar from './layout/Sidebar.jsx'
import Home from './Views/Home.jsx'
import Login from "./Views/Login"
import './index.css'

function App() {  


	// Hook para conocer estado sesion usuario
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	// Funcion modificacion valor hook
	const handleLogin = () => {
		setIsLoggedIn(true);
	};
	return (
		<>
		{/* Orden Rutas */}
		  <BrowserRouter>
			{/* Navigation */}
		  <nav>
			<Navbar/>
		  </nav>
			{/* Content Distribution for column order with sidebar and screens*/}
		<div className='contentDistribution'>
		  <nav>
			<Sidebar/>
		  </nav>

		  <main>
		{/* Rutas */}
			<Routes>
				<Route exact path = "/" element={<Home/>}/>
				<Route path="/login" element={<Login/>}/>
			</Routes>
		  </main>
		</div>
		  </BrowserRouter>
		</>
	);
};

export default App;
