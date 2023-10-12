import React, { useContext } from 'react';
import AuthContext from '../AuthContext';

const Home = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className='rectangulito'>
            {user ? (
                <div>
                    <h1>¡Bienvenido{user.isAdmin ? ', Administrador' : ', Usuario'}!</h1>
                    <div className='someText'>
                        Para comenzar a{user.isAdmin ? ' administrar' : ' navegar'}, diríjase a la barra lateral del navegador.
                    </div>
                </div>
            ) : (
                <div>
                    <p>Redirigiendo, Sesión No Iniciada</p>
                </div>
            )}
        </div>
    );
}

export default Home;
