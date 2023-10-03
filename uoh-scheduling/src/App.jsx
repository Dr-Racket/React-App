import React from 'react';
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';
import { AuthProvider, } from './AuthContext'
import Vistas from './Vistas';
import './index.css';

function App() {
  return (
    <>
      <BrowserRouter>
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
              <Route exact path="/" element={<Vistas.Home />} />

              {/* Ruta de login sin Sidebar */}
              <Route path="/login" element={<Vistas.Login />} />

              {/* Rutas con Sidebar */}
                      {/* Rutas con Sidebar */}
                <Route path="/Agregarprofe" element={<Vistas.Agregarprofe />} />
                <Route path="/Agregarcurso" element={<Vistas.Agregarcurso />} />
                <Route path="/Modificarprofe" element={<Vistas.ModificarProfe />} />
                <Route path="/Modificarcurso" element={<Vistas.ModificarCurso />} />
                <Route path="/Eliminarprofe" element={<Vistas.EliminarProfesor />} />
                <Route path="/Eliminarcurso" element={<Vistas.EliminarCurso />} />
                {/* Otras rutas con Sidebar */}
                <Route path="/Cambiarcurso" element={<Vistas.CambiarCurso />} />
                <Route path="/Cambiarprofe" element={<Vistas.CambiarProfe />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;