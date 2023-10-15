import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './component_styles.css';
import UOHname from '../media/UOHname.png';
import USOLA from '../media/USOLA.png';
import { useState, useContext } from 'react';
import AuthContext from '../AuthContext';

function Navbar()
{

	let { user, logoutUser } = useContext(AuthContext)
	return(
		<>
			<div className='NavBar'>

				{/* Carga Logo UOH en navbar */}
				<img src={UOHname} alt="UOH_LOGO" className='UOH'/>
				<img src={USOLA} alt="USOLA" className='USOLA'/>	
				{/* Links to paths */}
				<Link to='/' className='Link'>
					Volver a Inicio
				</Link>
				{user && <p className='username-display'>Bienvenido/a, {user.username}!</p>}
				<div className='sep'/>
				{user ? (
                <button onClick={logoutUser} className='cerrarSesion'>Cerrar Sesión</button>
            ) : (
                <Link className='Link' to="/login" >Iniciar Sesión</Link>
            )}
			</div>
		</>
	)
}

export default Navbar;
