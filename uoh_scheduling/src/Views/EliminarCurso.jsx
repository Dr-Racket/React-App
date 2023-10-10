import React, { useState, useEffect } from 'react';
import axios from "axios"

import '../css/Cursos.css'


function EliminarCurso() {
    const [search, setSearch] = useState("");

    const [NCursos, setNCursos] = useState([]);

  // Función para realizar la solicitud a la API
  useEffect(() => {
    // URL de la API que devuelve la lista de cursos
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
  }, []); // El segundo argumento vacío [] asegura que la solicitud se realice solo una vez


      const filteredCursos = NCursos.filter((curso, index) => {
          if(search){
            return curso.name.toLowerCase().includes(String(search).toLowerCase());
          }else{ return curso.name }
      });
      const renderCursos = () => {
          return filteredCursos.map((curso, index) => (
            <li key={index}>
                <a href={curso.url}>{curso.name} {curso.code} \ semestre {curso.semester}</a>
              </li>
            ));
      };

      const handleButton = () => {
        return renderCursos()
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
                </div>
            </div>
        </div>

    );
}


export default EliminarCurso;

