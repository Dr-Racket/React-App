import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './component_styles.css';
import UOHname from '../media/UOHname.png';


function Navbar()
{
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

				<Link to='/login' className='Link'>
					Login
				</Link>
			</div>
		</>
	)
}

export default Navbar;
