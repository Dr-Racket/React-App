import React, { useState, useEffect } from 'react';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import '../../css/Profesores.css';

function EliminarProfesor() {
  // Barra Busqueda Hooks
  const [search, setSearch] = useState("");
  const [profesores, setProfesores] = useState([]);


  // Función para realizar la solicitud a la API
  useEffect(() => {
    cargarprofes();
  }, []); // El segundo argumento vacío [] asegura que la solicitud se realice solo una vez

  const cargarprofes = () => {
    // URL de la API que devuelve la lista de profesores
    const apiUrl = 'http://localhost:8000/api/getTeachers/';

    // Realizar la solicitud GET utilizando Axios
    axios
      .get(apiUrl)
      .then((response) => {
        // Actualizar el estado con los datos de los profesores
        setProfesores(response.data);
        console.log(response)
      })
      .catch((error) => {
        // Manejar errores si la solicitud falla
        console.error('Error al obtener la lista de profesores:', error);
      });
  }

  const filteredProfes = profesores.filter((profesor, index) => {
      if(search){
          return profesor.name.toLowerCase().includes(String(search).toLowerCase());
      }else{ return profesor.name}
  });

  const renderProfes = () => {
      return filteredProfes.map((profesor, index) => (
          <li key={index} style= {{color:'black'}}>
            {profesor.name}
            <div style={ {textAlign: 'right'} }>
              <button className='aplicar-button' onClick={() => handleEliminarProfesor(profesor)}>
                Eliminar
              </button>
            </div>
          </li>
        ));
  };


  const handleEliminarProfesor = (profesor) => {
    const confirmar = window.confirm(`¿Estás seguro de que deseas eliminar al profesor ${profesor.name}?`);
    if(confirmar){
      if(profesor){
        const apiUrl = `http://localhost:8000/api/deleteTeacher/${profesor.id}`;
        
        axios
        .delete(apiUrl)
        .then((response) => {
          console.log('Profesor eliminado con éxito:', response.data);
          setProfesores((prevProfesores) => prevProfesores.filter((prof) => prof.id !== profesor.id));
          toast.success(`Profesor ${profesor.name} eliminado con éxito`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000, // 3 segundos
          });
        })
        .catch((error) => {
          console.error('Error al eliminar el profesor:', error);
        });
      }
    }
  };
  
  return (
    <div className="container-mprofe">
      <h2>Eliminar Profesores</h2>
      <div className="container-search">
        <input
          type="text"
          placeholder="Buscar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="container-scroll">
        <div className="content">
          <ul>
            {renderProfes()}
          </ul>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default EliminarProfesor;
