/*Archivo que contiene todas las rutas de las vistas creadas*/

import Navbar from "./layout/Navbar.jsx"
import Sidebar from './layout/Sidebar.jsx'

import Home from './Views/Home.jsx'
import Login from "./Views/Login.jsx"

import Agregarprofe from "./Views/agregar/Agregarprofe.jsx"
import Agregarcurso from "./Views/UserViews/Courses/AddCourseAlgorithm.jsx"

import ModificarProfe from "./Views/modificar/Modificarprofe.jsx"
import ModificarCurso from "./Views/modificar/Modificarcurso.jsx"

import EliminarCurso from "./Views/AdminViews/Courses/EliminarCurso.jsx"
import EliminarProfesor from "./Views/AdminViews/Teachers/EliminarProfesor.jsx"

import Editarprefcurso from "./Views/editarPreferencias/EditarPrefCurso.jsx"
import Editarprefprofe from "./Views/editarPreferencias/EditarPrefProfe.jsx"

import AgregarProfeAdmin from "./Views/AdminViews/Teachers/Agregarprofeadmin.jsx"
import AgregarCursoAdmin from "./Views/AdminViews/Courses/Agregarcursoadmin.jsx"

//Algorithm views
import addCourseAlgorithm from "./Views/UserViews/Courses/AddCourseAlgorithm.jsx"
import deleteCourseAlgorithm from "./Views/UserViews/Courses/DeleteCourseAlgorithm.jsx"


export default {
    Navbar,
    Sidebar,
    Home,
    Login,
    addCourseAlgorithm,
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
    deleteCourseAlgorithm,
}

