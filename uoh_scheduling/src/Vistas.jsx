/*Archivo que contiene todas las rutas de las vistas creadas*/

import view404 from "./Views/404/404.jsx"

import Navbar from "./layout/Navbar.jsx"
import Sidebar from './layout/Sidebar.jsx'

import Home from './Views/Home.jsx'
import Login from "./Views/Login.jsx"

import EliminarCurso from "./Views/AdminViews/Courses/EliminarCurso.jsx"
import EliminarProfesor from "./Views/AdminViews/Teachers/EliminarProfesor.jsx"

import Editarprefcurso from "./Views/editarPreferencias/EditarPrefCurso.jsx"
import Editarprefprofe from "./Views/editarPreferencias/EditarPrefProfe.jsx"

import AgregarProfeAdmin from "./Views/AdminViews/Teachers/Agregarprofeadmin.jsx"
import AgregarCursoAdmin from "./Views/AdminViews/Courses/Agregarcursoadmin.jsx"

//Algorithm views
import addCourseAlgorithm from "./Views/UserViews/Courses/AddCourseAlgorithm.jsx"
import deleteCourseAlgorithm from "./Views/UserViews/Courses/DeleteCourseAlgorithm.jsx"

import AddTeacherAlgorithm from "./Views/UserViews/Teacher/AddTeacherAlgorithm.jsx"
import DeleteTeachersAlgorithm from "./Views/UserViews/Teacher/DeleteTeacherAlgorithm.jsx"

import ModificarProfe from "./Views/UserViews/Modificar/Modificarprofe.jsx"
import ModificarCurso from "./Views/UserViews/Modificar/Modificarcurso.jsx"

import setHorariosProtegidos from "./Views/Generacion_Horarios/horariosprotegidos.jsx"

export default {

    view404,
    Navbar,
    Sidebar,
    Home,
    Login,
    addCourseAlgorithm,
    ModificarProfe,
    ModificarCurso,
    Editarprefprofe,
    Editarprefcurso,
    EliminarCurso,
    EliminarProfesor,
    AgregarProfeAdmin,
    AgregarCursoAdmin,
    deleteCourseAlgorithm,
    AddTeacherAlgorithm,
    DeleteTeachersAlgorithm,
    setHorariosProtegidos
}

