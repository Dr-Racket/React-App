import React, { useState, useEffect } from 'react';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../../css/Cursos.css'


function EliminarCurso() {
    const [search, setSearch] = useState("");
    const [NCursos, setNCursos] = useState([]);
    const [cursoSeleccionado, setCursoSeleccionado] = useState("");
    const [showConfirmation, setShowConfirmation] = useState("");

  // Función para realizar la solicitud a la API
  useEffect(() => {
    cargarcursos();
  }, []); // El segundo argumento vacío [] asegura que la solicitud se realice solo una vez

  const cargarcursos = () => {
    const apiUrl = 'http://localhost:8000/api/getCourses/';

    // Realizar la solicitud GET utilizando Axios
    axios.get(apiUrl)
      .then((response) => {
        // Actualizar el estado con los datos de los cursos
        setNCursos(response.data);
        console.log(response)
      })
      .catch((error) => {
        // Manejar errores si la solicitud falla
        console.error('Error al obtener la lista de cursos:', error);
      });
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

  const handleEliminarCurso = (curso) => {
    setCursoSeleccionado(curso);
    toast.warn(`¿Está seguro de que desea eliminar el curso ${curso.name}?`, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: false,
      closeButton: false,
      closeOnClick: false,
      draggable: false,
    });
    setShowConfirmation(true);
  };

  const cancelarEliminacion = () => {
    toast.dismiss(); //Cierra la notificación de cancelar
    setShowConfirmation(false);
  }

  const eliminarCurso = (nombre) => {
    if(cursoSeleccionado){
      const apiUrl = `http://localhost:8000/api/deleteCourse/${cursoSeleccionado.id}`;
      
      axios
        .delete(apiUrl)
        .then((response) => {
          console.log('Curso eliminado con éxito:', response.data);
          setNCursos((prevNCursos) => prevNCursos.filter((cur) => cur.id !== cursoSeleccionado.id));
          setShowConfirmation(false);
          setCursoSeleccionado('');
          toast.dismiss();
          toast.success(`Curso ${cursoSeleccionado.name} eliminado con éxito`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000, // 3 segundos
          });
        })
        .catch((error) => {
          console.error('Error al eliminar el curso:', error);
        });
    } else {
      console.error('Cursos seleccionado no es válido');
    }
  };

  return(
    <div className="Container-Cursos">
      <h2>Eliminar Cursos</h2>
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
            {/* Mostrar mensaje de confirmación */}
            {showConfirmation && (
              <div className="confirmation">
                <p>¿Está seguro de que desea eliminar el curso {cursoSeleccionado?.name}?</p>
                <button className="aplicar-button" onClick={eliminarCurso}>
                  Eliminar
                </button>
                <button className="aplicar-button" onClick={cancelarEliminacion}>
                  Cancelar
                </button>
              </div>
            )}
        </div>

  );
}


export default EliminarCurso;

