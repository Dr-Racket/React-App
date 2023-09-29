import React, { useState, useEffect, useNavigate } from 'react'
import { BrowserRouter,  Routes, Route} from "react-router-dom"
import Navbar from "./layout/navbar.jsx"
import Home from './Views/Home.jsx'
import Login from "./Views/Login"

function App() {  

	const navigate = useNavigate();

	// Hook para conocer estado sesion usuario
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	// Funcion modificacion valor hook
	const handleLogin = () => {
		setIsLoggedIn(true);
		navigate('/login');
	};
	return (
		<>
	  <BrowserRouter>
	  <nav>
		{isLoggedIn ? <Navbar /> : <Login onLogin={handleLogin} />}
	  </nav>
	  <main>
		<Routes>
			<Route exact path = "/" element={<Home/>}/>
			<Route path="/login" element={<Login onLogin={handleLogin} />}/>
		</Routes>
	  </main>
   


	    </BrowserRouter>
		</>
	);
};

export default App;
