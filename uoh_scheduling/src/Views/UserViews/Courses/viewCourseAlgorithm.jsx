import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import '../../../css/DeleteCourseAlgorithm.css'

function viewcoursesAlgorithm() { 
    const navigate = useNavigate()
    const [search, setSearch] = useState("");
    const [NCursos, setNCursos] = useState([]);

  // Función para realizar la solicitud a la API
  useEffect(() => {
    const storedCourses = localStorage.getItem("selectedCourses")
    setNCursos((storedCourses) ? JSON.parse(storedCourses) : [])

  }, []); // El segundo argumento vacío [] asegura que la solicitud se realice solo una vez

  const filteredCursos = NCursos.filter((curso, index) => {
    if(search){
      return curso.name.toLowerCase().includes(String(search).toLowerCase());
    }else{ return curso.name }
    });
  
  const renderCursos = () => {
    return filteredCursos.map((curso, index) => (
      <li className="curso-item" key={index} style= {{color:'black'}}>
        {curso.name} {curso.code} \ semestre en la carrera {curso.semesterincareer}
       </li>
    ));
   };

  const handleAgregarCursosClick = () => {
    // Redirigir a la ruta de agregar cursos
    navigate('/addCourseAlgorithm');
  };

  const handleEliminarCursosClick = () => {
    // Redirigir a la ruta de eliminar cursos
    navigate('/deleteCourseAlgorithm');
  };

   const noCoursesMessage = (
    <div>
      <p>No se han añadido cursos al algoritmo.</p>
      <button onClick={handleAgregarCursosClick}>
        Agregar Cursos
      </button>
    </div>
  );

  const coursesAddedButtons = (
    <div>
      <button onClick={handleAgregarCursosClick}>
        Agregar más Cursos
      </button>
      <button onClick={handleEliminarCursosClick}>
        Eliminar Cursos
      </button>
    </div>
  );

  return (
    <div className="agregar-estilo-container">
      <h2 className="title">Cursos que fueron agregados al algoritmo</h2>
      <div className="Container-Cursos-Search">
        <input
          type="text"
          placeholder="Buscar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="Container-Scroll">
        <div className="Content-Cursos">
          {NCursos.length === 0 ? noCoursesMessage : coursesAddedButtons}
          {NCursos.length === 0 ? null : (
            <ul>
              {renderCursos()}
            </ul>
          )}
          <ToastContainer />
        </div>
      </div>
    </div>
  );

}

export default viewcoursesAlgorithm;