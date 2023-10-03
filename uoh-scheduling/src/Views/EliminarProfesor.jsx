import React, { useState, useEffect } from 'react';
import axios from "axios"

import '../css/modificarprofe.css'

function EliminarProfesor() {
  // Barra Busqueda Hooks
  const [search, setSearch] = useState("");
  const [button, setButton] = useState(false);

  const [profesores, setProfesores] = useState([]);

  // Función para realizar la solicitud a la API
  useEffect(() => {
    // URL de la API que devuelve la lista de profesores
    const apiUrl = 'http://127.0.0.1:8000/api/getTeachers/';

    // Realizar la solicitud GET utilizando Axios
    axios.get(apiUrl)
      .then((response) => {
        // Actualizar el estado con los datos de los profesores
        setProfesores(response.data);
        console.log(response)
      })
      .catch((error) => {
        // Manejar errores si la solicitud falla
        console.error('Error al obtener la lista de profesores:', error);
      });
  }, []); // El segundo argumento vacío [] asegura que la solicitud se realice solo una vez

  const handleButton = () => {
      if (search) {
            setButton(true);
      }else {
      setButton(false);
      }
  };


  const filteredProfes = profesores.filter((profesor, index) => {
      if(button){
          return profesor.name.toLowerCase().includes(String(search).toLowerCase());
      }else{ return profesor.name}
  });

  const renderProfes = () => {
      return filteredProfes.map((profesor, index) => (
        <li key={index}>
            <a href="#">{profesor.name}</a>
          </li>
        ));
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
        <button onClick={handleButton} className="aplicar-button" type="submit">Buscar</button>
      </div>
      <div className="container-scroll">
        <div className="content">
          <ul>
            {renderProfes()}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default EliminarProfesor;