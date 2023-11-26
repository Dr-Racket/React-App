import React from 'react';
import './component_styles.css';
import { Link, Route, Routes } from 'react-router-dom';

//https://linktr.ee/DrRacket https://github.com/Dr-Racket

function NoNavbar()
{

	return(
		<>
			<div className='NoNavBar'>
                <div className='paperFeet'>
					<a className="Link" href="https://linktr.ee/DrRacket" target="_blank">Developed by Dr.Racket UOH</a>
                </div>
			</div>
		</>
	)
}

export default NoNavbar;
