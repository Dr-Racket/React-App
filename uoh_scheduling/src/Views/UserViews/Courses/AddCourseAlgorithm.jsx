import React, { useState, useEffect } from 'react';
import axios from "axios"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../../../css/AddCourseAlgorithm.css'
function addCourseAlgorithm() {
  const [curso, setCurso] = useState('');   // Estado para el curso
  const [mensaje, setMensaje] = useState(''); // Estado para el mensaje
  const [fetched_courses, fetchCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const handleCheckboxChange = (curso) => {
    console.log(curso.id)
    // Copiar el estado actual de los cursos seleccionados
    const updatedSelectedCourses = [...selectedCourses];
  
    // Comprobar si el curso ya está en la lista de cursos seleccionados
    const index = updatedSelectedCourses.findIndex(obj => obj.name === curso.name);
    console.log(index)
    if (index === -1) {
      // Si no está en la lista, agrégalo
      updatedSelectedCourses.push(curso);
    } else {
      // Si ya está en la lista, quítalo
      updatedSelectedCourses.splice(index, 1);
    }
  
    // Actualizar el estado de los cursos seleccionados
    setSelectedCourses(updatedSelectedCourses);
  };
  useEffect(() => {
    // URL de la API que devuelve la lista de cursos
    const apiUrl = 'http://127.0.0.1:8000/api/getCourses/';

    // Realizar la solicitud GET utilizando Axios
    axios.get(apiUrl)
      .then((response) => {
        // Actualizar el estado con los datos de los cursos
        fetchCourses(response.data);
        console.log(response)
      })
      .catch((error) => {
        // Manejar errores si la solicitud falla
        console.error('Error al obtener la lista de cursos:', error);
      });
  }, []);
  const filteredCursos = fetched_courses.filter((curso, index) => {
    if(search){
      return curso.name.toLowerCase().includes(String(search).toLowerCase());
    }else{ return curso.name }
});

const renderCursos = () => {
  
  return filteredCursos.map((curso, index) => (
    <li key={index} className='render-li-courses-style'>
      <div className='div-li-courses-name'>
        {curso.name} {curso.code} \ semestre {curso.semester}
      </div>
      <div className='div-li-courses-button'>
        <input
          type='checkbox'
          onChange={() => handleCheckboxChange(curso)}
          checked={selectedCourses.includes(curso)}
        />
      </div>
    </li>
  ));
};


  const aplicarCambios = () => {
    
    const storedCourses = JSON.parse(localStorage.getItem('selectedCourses')) || [];
    const uniqueCourses = selectedCourses.filter((course) => {
      return !storedCourses.some((storedCourse) => storedCourse.id === course.id);
    });
    if (selectedCourses.length === 0) {
      toast.error(`Por favor, selecciona al menos un curso para agregar al algoritmo`, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000, // 3 segundos
            });
    }
    else {
      const currentCourses = JSON.parse(localStorage.getItem("selectedCourses"));
      const updatedCourses = [...storedCourses, ...uniqueCourses];

      // Almacena los cursos actualizados en localStorage
      localStorage.setItem('selectedCourses', JSON.stringify(updatedCourses));
      toast.success(`Cursos agregados con éxito`, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000, // 3 segundos
            });
    }
    
    console.log(localStorage.getItem("selectedCourses"))
  };

  return (
    <div className="Container-Cursos">
    <h2 className='title'>Agrega Cursos al Algoritmo</h2>
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
        </div>
    </div>
    <div className='Container-Buttons'>
    <div className='conten-button'>

      </div>
      <div className='conten-button'>
        <button className="aplicar-button" onClick={aplicarCambios}>
          Añadir al algoritmo
        </button>
        <>
          <ToastContainer />
        </>
      </div>
    </div>
    
</div>

);
}
export default addCourseAlgorithm;
