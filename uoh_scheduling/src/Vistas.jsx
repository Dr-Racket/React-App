/*Archivo que contiene todas las rutas de las vistas creadas*/

import view404 from "./Views/404/404.jsx"

import Navbar from "./layout/Navbar.jsx"
import Sidebar from './layout/Sidebar.jsx'
import NoNavbar from './layout/NoNavbar.jsx'

import Home from './Views/Home.jsx'
import Login from "./Views/Login.jsx"

import EliminarCurso from "./Views/AdminViews/Courses/EliminarCurso.jsx"
import EliminarProfesor from "./Views/AdminViews/Teachers/EliminarProfesor.jsx"

import Editarpreferenciaprofe from "./Views/editarPreferencias/EditarPrefProfe.jsx"

import AgregarProfeAdmin from "./Views/AdminViews/Teachers/Agregarprofeadmin.jsx"
import AgregarCursoAdmin from "./Views/AdminViews/Courses/Agregarcursoadmin.jsx"

//Algorithm views
import addCourseAlgorithm from "./Views/UserViews/Courses/AddCourseAlgorithm.jsx"
import deleteCourseAlgorithm from "./Views/UserViews/Courses/DeleteCourseAlgorithm.jsx"

import AddTeacherAlgorithm from "./Views/UserViews/Teacher/AddTeacherAlgorithm.jsx"
import DeleteTeachersAlgorithm from "./Views/UserViews/Teacher/DeleteTeacherAlgorithm.jsx"

import ModificarProfe from "./Views/UserViews/Modificar/Modificarprofe.jsx"
import ModificarCurso from "./Views/UserViews/Modificar/Modificarcurso.jsx"

import viewcoursesAlgorithm from "./Views/UserViews/Courses/viewCourseAlgorithm.jsx"

//Algorithm -> Api
import HorarioGenerado from "./Views/Generacion_Horarios/HorarioGenerado.jsx"
import setHorariosProtegidos from "./Views/Generacion_Horarios/horariosprotegidos.jsx"


//test
import vistaTemp from "./Views/vistaTemp.jsx"

export default {

    view404,
    Navbar,
    Sidebar,
    Home,
    HorarioGenerado,
    Login,
    addCourseAlgorithm,
    ModificarProfe,
    ModificarCurso,
    Editarpreferenciaprofe,
    EliminarCurso,
    EliminarProfesor,
    AgregarProfeAdmin,
    AgregarCursoAdmin,
    deleteCourseAlgorithm,
    viewcoursesAlgorithm,
    AddTeacherAlgorithm,
    DeleteTeachersAlgorithm,
    setHorariosProtegidos,
    vistaTemp,
    NoNavbar
}

