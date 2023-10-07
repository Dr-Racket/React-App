import React from 'react';
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';
import { AuthProvider, } from './AuthContext'
import Vistas from './Vistas';
import './index.css';
import PrivateRoute from './Views/PrivateRoute';

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

              {/* Rutas con Sidebar */}
                      {/* Rutas con Sidebar */}
                <Route path="/Agregarprofe" element={<PrivateRoute><Vistas.Agregarprofe/></PrivateRoute>} />
                <Route path="/Agregarcurso" element={<PrivateRoute><Vistas.Agregarcurso /> </PrivateRoute>} />
                <Route path="/Modificarprofe" element={<PrivateRoute><Vistas.ModificarProfe /></PrivateRoute>} />
                <Route path="/Modificarcurso" element={<PrivateRoute><Vistas.ModificarCurso /></PrivateRoute>} />
                <Route path="/Eliminarprofe" element={<PrivateRoute><Vistas.EliminarProfesor /></PrivateRoute>} />
                <Route path="/Eliminarcurso" element={<PrivateRoute><Vistas.EliminarCurso /></PrivateRoute>} />
                {/* Otras rutas con Sidebar */}
                <Route path="/EditarprefC" element={<PrivateRoute><Vistas.Editarprefcurso /></PrivateRoute>} />
                <Route path="/EditarprefP" element={<PrivateRoute><Vistas.Editarprefprofe /></PrivateRoute>} />
                {/*Rutas administrador*/}
                <Route path="/postProfesor" element={<PrivateRoute><Vistas.AgregarProfeAdmin /></PrivateRoute>}/>
                <Route path="/postCurso" element={<PrivateRoute><Vistas.AgregarCursoAdmin /></PrivateRoute>}/>
            </Routes>
          </main>
        </div>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;