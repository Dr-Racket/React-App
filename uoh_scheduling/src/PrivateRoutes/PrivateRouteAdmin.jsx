import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../AuthContext';

const PrivateRouteAdmin = ({ children, ...rest }) => {
    const { user } = useContext(AuthContext);

    const isAdmin = user && user.isAdmin;

    return isAdmin ? children : <Navigate to="/" />;
};

export default PrivateRouteAdmin;
