/*Archivo que contiene todas las rutas de las vistas creadas*/

import Navbar from "./layout/Navbar.jsx"
import Sidebar from './layout/Sidebar.jsx'

import Home from './Views/Home.jsx'
import Login from "./Views/Login.jsx"

import Agregarprofe from "./Views/agregar/Agregarprofe.jsx"
import Agregarcurso from "./Views/agregar/Agregarcurso.jsx"

import ModificarProfe from "./Views/modificar/Modificarprofe.jsx"
import ModificarCurso from "./Views/modificar/Modificarcurso.jsx"

import EliminarCurso from "./Views/eliminar/EliminarCurso.jsx"
import EliminarProfesor from "./Views/eliminar/EliminarProfesor.jsx"

import Editarprefcurso from "./Views/editarPreferencias/EditarPrefCurso.jsx"
import Editarprefprofe from "./Views/editarPreferencias/EditarPrefProfe.jsx"

import AgregarProfeAdmin from "./Views/agregar/Agregarprofeadmin.jsx"
import AgregarCursoAdmin from "./Views/agregar/Agregarcursoadmin.jsx"


export default {
    Navbar,
    Sidebar,
    Home,
    Login,
    Agregarprofe,
    Agregarcurso,
    ModificarProfe,
    ModificarCurso,
    Editarprefprofe,
    Editarprefcurso,
    EliminarCurso,
    EliminarProfesor,
    AgregarProfeAdmin,
    AgregarCursoAdmin,
}

