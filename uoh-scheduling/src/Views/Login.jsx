import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, Router, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';
import { useNavigate } from 'react-router';
import Messages from './Messages';
import Loader from './Loader';
import { LockClosedIcon } from '@heroicons/react/20/solid';
import uoh from '../media/uoh.png';
import Home from '../Views/Home.jsx';
import './views_styles.css';

const Login = ({ onLogin }) => {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();

	const userLogin = useSelector(state => state.userLogin);
	const {error, loading, userInfo} = userLogin;

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(login(email, password))
	}


	return (
		<>
		<div className='MAIN'>
			<button onClick={onLogin} className="button">Login</button>
		</div>
		</>
	);
};

export default Login;
