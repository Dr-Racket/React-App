import React from 'react';
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';
import { AuthProvider, } from './AuthContext'
import Vistas from './Vistas';
import './index.css';
import PrivateRoute from './PrivateRoutes/PrivateRoute';
import PrivateRouteAdmin from './PrivateRoutes/PrivateRouteAdmin';

function App() {
  return (
    <>
      <BrowserRouter>
      <AuthProvider>
        <nav>
          <Vistas.Navbar />
        </nav>
        <div className="contentDistribution">
          <nav>
            <Vistas.Sidebar />
          </nav>
          <main>
            <Routes>
              {/* Ruta de inicio sin Sidebar */}
              <Route exact path="/" element={<PrivateRoute><Vistas.Home /></PrivateRoute>} />

              {/* Ruta de login sin Sidebar */}
              <Route path="/login" element={<Vistas.Login />} />

                {/* Rutas con Sidebar USUARIO & ALGORITMO */}

                <Route path="/Modificarprofe" element={<PrivateRoute><Vistas.ModificarProfe /></PrivateRoute>} />
                <Route path="/Modificarcurso" element={<PrivateRoute><Vistas.ModificarCurso /></PrivateRoute>} />

                <Route path="/addCourseAlgorithm" element={<PrivateRoute><Vistas.addCourseAlgorithm/> </PrivateRoute>} />
                <Route path="/deleteCourseAlgorithm" element={<PrivateRoute><Vistas.deleteCourseAlgorithm /></PrivateRoute>} />

                <Route path="/addTeacherAlgorithm" element={<PrivateRoute><Vistas.AddTeacherAlgorithm/></PrivateRoute>} />
                <Route path="/deleteTeacherAlgorithm" element={<PrivateRoute><Vistas.DeleteTeachersAlgorithm /></PrivateRoute>} />

                {/* rutas horarios */}
                <Route path="/HorarioGenerado" element={<PrivateRoute><Vistas.HorarioGenerado /></PrivateRoute>} />

                {/* Otras rutas con Sidebar */}
                <Route path="/EditarprefC/:curso" element={<PrivateRoute><Vistas.Editarprefcurso /></PrivateRoute>} />
                <Route path="/EditarprefP/:nombre" element={<PrivateRoute><Vistas.Editarprefprofe /></PrivateRoute>} />

                {/*Rutas administrador*/}
                <Route path="/postProfesor" element={<PrivateRouteAdmin><Vistas.AgregarProfeAdmin /></PrivateRouteAdmin>}/>
                <Route path="/postCurso" element={<PrivateRouteAdmin><Vistas.AgregarCursoAdmin /></PrivateRouteAdmin>}/>
                <Route path="/Eliminarprofe" element={<PrivateRouteAdmin><Vistas.EliminarProfesor /></PrivateRouteAdmin>} />
                <Route path="/Eliminarcurso" element={<PrivateRouteAdmin><Vistas.EliminarCurso /></PrivateRouteAdmin>} />
                <Route path="/404" element={<PrivateRoute><Vistas.view404/></PrivateRoute>} />

                <Route path="/sethorariosp" element={<PrivateRoute><Vistas.setHorariosProtegidos/></PrivateRoute>} />

                <Route path="/testeo" element={<Vistas.vistaTemp/>} />

            </Routes>
          </main>
        </div>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
