import React, { useState, useEffect } from 'react';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../../../css/DeleteCourseAlgorithm.css'



function DeleteTeacherAlgorithm() {
    const [search, setSearch] = useState("");
    const [NProfes, setNProfes] = useState([]);

  // Función para realizar la solicitud a la API
  useEffect(() => {
    const storedTeachers= localStorage.getItem("selectedTeachers")
    setNProfes((storedTeachers) ? JSON.parse(storedTeachers) : [])

  }, []); // El segundo argumento vacío [] asegura que la solicitud se realice solo una vez
  const handleEliminarProfe = (profesor) => {

    const currentTeacher = JSON.parse(localStorage.getItem("selectedCourses")) || []
    const index = currentTeacher.findIndex(pro => pro.id === profesor.id)
    if (index !==-1){
      currentTeacher.splice(index, 1)
      localStorage.setItem("selectedTeachers", JSON.stringify(currentTeacher))
      setNProfes(currentTeacher)
    }
  }

  const filteredTeachers= NProfes.filter((profes, index) => {
    if(search){
      return profes.name.toLowerCase().includes(String(search).toLowerCase());
    }else{ return profes.name }
    });
  
  const renderProfes= () => {
    return filteredTeachers.map((profes, index) => (
      <li key={index} style= {{color:'black'}}>
        {profes.name}
        <div style={ {textAlign: 'right'}}>
          <button className='aplicar-button' onClick={() => handleEliminarTeacher(profes)}>
            Eliminar
          </button>
        </div>
      </li>
    ));
  };



  return(
    <div className="Container-Cursos">
      <h2 className='title'>Elimina Profesores del algoritmo</h2>
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
                        {renderProfes()}
                    </ul>
                    <ToastContainer />
                </div>
            </div>
        </div>

  );
}


export default DeleteTeacherAlgorithm;

