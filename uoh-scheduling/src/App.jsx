/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useState, useEffect, useNavigate } from 'react'
import { BrowserRouter,  Routes, Route} from "react-router-dom"
import Vistas from './Vistas';
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
			<Vistas.Navbar/>
		  </nav>
			{/* Content Distribution for column order with sidebar and screens*/}
		<div className='contentDistribution'>
		  <nav>
			<Vistas.Sidebar/>
		  </nav>

		  <main>
		{/* Rutas */}
			<Routes>
				<Route exact path = "/" element={<Vistas.Home/>}/>
				<Route path="/login" element={<Vistas.Login/>}/>
				<Route path="/Agregarprofe" element={<Vistas.Agregarprofe/>}/>
				<Route path="/Modificarprofe" element={<Vistas.ModificarProfe/>}/>
			</Routes>
		  </main>
		</div>
		  </BrowserRouter>
		</>
	);
};

export default App;
