import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import '../../css/Profesores.css'

function ModificarProfe() {

  const navigate = useNavigate();

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
  //
  const handleModificarClick = (nombre) => {
    // Utiliza navigate para redirigir a la página Editarprefprofe con el nombre como parámetro
    navigate(`/EditarprefP/${nombre}`);
  };


  // To search for the profe target in searchbar
  const filteredProfes = profesores.filter((profesor, index) => {
      if(search){
          return profesor.name.toLowerCase().includes(String(search).toLowerCase());
      }else{ return profesor.name}
  });

  // Function for rendering Profes as a row list

  const renderProfes = () => {
  return filteredProfes.map((profesor, index) => (
       <li key={index} style={{color:'black'}}>
           {profesor.name}
           <div style={ {textAlign: 'right'}}>
             <button className='aplicar-button' onClick={() => handleModificarClick(profesor.name)}>Modificar</button>
           </div>
       </li>
     ));
  };

  
  return (
    <div className="container-mprofe">
      <h2>Modificar Profesores</h2>
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
        </div>
      </div>
    </div>
  );
}

export default ModificarProfe;
