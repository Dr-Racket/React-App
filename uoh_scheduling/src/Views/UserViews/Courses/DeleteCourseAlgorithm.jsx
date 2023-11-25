import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import '../../../css/DeleteCourseAlgorithm.css'



function deleteCourseAlgorithm() {
  const [search, setSearch] = useState("");
  const [NCursos, setNCursos] = useState([]);
  const navigate = useNavigate()

  // Función para realizar la solicitud a la API
  useEffect(() => {
    const storedCourses = localStorage.getItem("selectedCourses")
    setNCursos((storedCourses) ? JSON.parse(storedCourses) : [])

  }, []); // El segundo argumento vacío [] asegura que la solicitud se realice solo una vez
  const handleEliminarCurso = (curso) => {
    const confirmar = window.confirm(`¿Estás seguro de que deseas eliminar el curso ${curso.name}?`);

    const currentCourses = JSON.parse(localStorage.getItem("selectedCourses")) || []
    const index = currentCourses.findIndex(cur => cur.id === curso.id)
    if (index !==-1 && confirmar){
      currentCourses.splice(index, 1)
      localStorage.setItem("selectedCourses", JSON.stringify(currentCourses))
      setNCursos(currentCourses)
      toast.success(`${curso.name} ha sido eliminado`, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000, // 3 segundos
      });
    }
  }

  const filteredCursos = NCursos.filter((curso, index) => {
    if(search){
      return curso.name.toLowerCase().includes(String(search).toLowerCase());
    }else{ return curso.name }
    });
  
  const renderCursos = () => {
    return filteredCursos.map((curso, index) => (
      <li className="curso-item" key={index} style= {{color:'black'}}>
        {curso.name} {curso.code} \ Semestre {curso.semester} \ Semestre en la carrera {curso.semesterincareer} 
          <button className='aplicar-button3' onClick={() => handleEliminarCurso(curso)}>
            Eliminar
           </button>
       </li>
    ));
  };

  const handleAgregarCursosClick = () => {
    // Redirigir a la ruta de agregar cursos
    navigate('/addCourseAlgorithm');
  };


  const noCoursesMessage = (
    <div style={{ textAlign: 'center'}}>
      <p style={{ fontSize: '1.3vw' }}>No se han añadido cursos al algoritmo.</p>
      <button style={{backgroundColor: '#3498db', color:'#fff'}}  onClick={handleAgregarCursosClick}>
        Agregar Cursos
      </button> 
    </div>
  );


  return(
    <div className="agregar-estilo-container">
      <div className="container-mprofe">
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
                    {NCursos.length === 0 ? (
                          <div>{noCoursesMessage}</div>
                        ) : (
                          <ul>
                          {renderCursos()}
                        </ul>
                        )}
                      <ToastContainer />
                  </div>
              </div>
        </div>
      </div>

  );
}


export default deleteCourseAlgorithm;

