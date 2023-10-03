import React, { useState, useEffect } from 'react';
import axios from "axios"

import '../css/modificarcurso.css'

function ModificarCurso() {
    const [cursos, setCursos] = useState([]);

  // Función para realizar la solicitud a la API
  useEffect(() => {
    // URL de la API que devuelve la lista de cursos
    const apiUrl = 'http://127.0.0.1:8000/api/getCourses/';

    // Realizar la solicitud GET utilizando Axios
    axios.get(apiUrl)
      .then((response) => {
        // Actualizar el estado con los datos de los cursos
        setCursos(response.data);
        console.log(response)
      })
      .catch((error) => {
        // Manejar errores si la solicitud falla
        console.error('Error al obtener la lista de cursos:', error);
      });
  }, []); // El segundo argumento vacío [] asegura que la solicitud se realice solo una vez

    return(
        <div class="Container-Cursos">
            <h2>Modificar Cursos</h2>
            <div class="Container-Cursos-Search">
                <input
                    type='text'
                    placeholder='Buscar'
                />
                <button class="aplicar-button" type="submit">Buscar</button>
            </div>
            <div class="Container-Scroll">
                <div class="Content-Cursos">
                    <ul>
                        {cursos.map((elemento, index) =>(
                            <li key={index}>
                                <a className= "link" href={elemento.name}> {elemento.name} {elemento.code}-{elemento.semester}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

    );
}


export default ModificarCurso;