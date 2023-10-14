import React, { useState, useEffect } from 'react';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../../../css/DeleteCourseAlgorithm.css'



function deleteTeacherAlgorithm() {
    const [search, setSearch] = useState("");
    const [NCursos, setNCursos] = useState([]);

  // Función para realizar la solicitud a la API
  useEffect(() => {
    console.log(localStorage.getItem("selectedCourses"))
    setNCursos(JSON.parse(localStorage.getItem("selectedCourses")))

  }, []); // El segundo argumento vacío [] asegura que la solicitud se realice solo una vez
  const handleEliminarCurso = (curso) => {
    const currentCourses = JSON.parse(localStorage.getItem("selectedCourses")) || []
    const index = currentCourses.findIndex(cur => cur.id === curso.id)
    if (index !==-1){
      currentCourses.splice(index, 1)
      localStorage.setItem("selectedCourses", JSON.stringify(currentCourses))
      setNCursos(currentCourses)
    }
  }

  const filteredCursos = NCursos.filter((curso, index) => {
    if(search){
      return curso.name.toLowerCase().includes(String(search).toLowerCase());
    }else{ return curso.name }
    });
  
  const renderCursos = () => {
    return filteredCursos.map((curso, index) => (
      <li key={index} style= {{color:'black'}}>
        {curso.name} {curso.code} \ semestre {curso.semester}
        <div style={ {textAlign: 'right'}}>
          <button className='aplicar-button' onClick={() => handleEliminarCurso(curso)}>
            Eliminar
          </button>
        </div>
      </li>
    ));
  };



  return(
    <div className="Container-Cursos">
      <h2 className='title'>Elimina cursos del algoritmo</h2>
        <div className="Container-Cursos-Search">
          <input
            type='text'
            placeholder='Buscar'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          </div>
            <div className="Container-Scroll">
                <div className="Content-Cursos">
                    <ul>
                        {renderCursos()}
                    </ul>
                    <ToastContainer />
                </div>
            </div>
        </div>

  );
}


export default deleteCourseAlgorithm;

