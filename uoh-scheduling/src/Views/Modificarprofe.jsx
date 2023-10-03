import React, { useState, useEffect } from 'react';
import axios from "axios"

import '../css/modificarprofe.css'

function ModificarProfe() {
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

  return (
    <div className="container-mprofe">
      <h2>Modificar Profesores</h2>
      <div className="container-search">
        <input
          type="text"
          placeholder="Buscar"
        />
        <button className="aplicar-button" type="submit">Buscar</button>
      </div>
      <div className="container-scroll">
        <div className="content">
          <ul>
            {profesores.map((elemento, index) =>(
              <li key={index}>
                <a className= "link" href={elemento.name}> {elemento.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ModificarProfe;
