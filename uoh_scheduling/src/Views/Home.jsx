import React, { useContext } from 'react'
import AuthContext from '../AuthContext';

const Home = () => {
    const { user } = useContext(AuthContext);

    return (user ? (
        <div className='rectangulito'>
            <h1>¡Bienvenido/a!</h1>
            <div className='someText'>
               Para comenzar a administrar diríjase a la barra lateral del navegador.
            </div>
        </div>
        ):(
        <div>
            <p>Redirigiendo, Sesión No Inciada</p>
        </div>
        )
    );
}

export default Home;
