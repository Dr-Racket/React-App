import React, { useContext } from 'react'
import AuthContext from '../AuthContext';

const Home = () => {
    const { user } = useContext(AuthContext);

    return (user ? (
        <div className='rectangulito'>
            <h1>You are logged in to the homepage!</h1>
        </div>
        ):(
        <div>
            <p>You are not logged in, redirecting...</p>
        </div>
        )
    )
}

export default Home
