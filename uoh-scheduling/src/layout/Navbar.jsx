import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './component_styles.css';
import UOHname from '../media/UOHname.png';
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

				{/* Links to paths */}
				<Link to='/' className='Link'>
					Main Page
				</Link>

				<div className='sep'/>
				{user ? (
                <button onClick={logoutUser}>Logout</button>
            ) : (
                <Link to="/login" >Login</Link>
            )}
            {user && <p>Hello {user.username}!</p>}
			</div>
		</>
	)
}

export default Navbar;
