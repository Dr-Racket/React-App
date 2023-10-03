import React, { useState } from 'react';
import axios from "axios"

import '../css/Estilosvistas.css'

function AgregarProfeAdmin() {
  const [nombre, setNombre] = useState(''); // Estado para el nombre
  const [mensaje, setMensaje] = useState(''); // Estado para el mensaje

  const aplicarCambios = () => {
    if (!nombre) {
      setMensaje('Por favor, ingrese un nombre de profesor');
    } else {
      // Datos del profesor a enviar
      const datosProfesor = {
        name: nombre,
      };

      // URL de tu API para agregar profesores
      const apiUrl = 'http://localhost:8000/api/postTeacher/';

      // Realizar la solicitud POST utilizando Axios
      axios
        .post(apiUrl, datosProfesor)
        .then((response) => {
          // Manejar la respuesta del servidor
          console.log('Solicitud POST exitosa:', response.data);
          setMensaje('Profesor agregado con éxito.');
        })
        .catch((error) => {
          // Manejar errores si la solicitud falla
          console.error('Error al realizar la solicitud POST:', error);
        });
    }
  };


  return (
    <div className="agregar-estilo-container">
      <h2>Agregar Profesor</h2>
      <div className="input-container">
        <label>Nombre:</label>
        <input
          type="text"
          placeholder="Introduce el nombre del profesor"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div className="horario-container">
        <h2>Es responsabilidad de usted que el nombre del profesor sea correcto.</h2>
        <div className="horario-wrapper">
          <div className="horario-horas">
          </div>
        </div>
      </div>
      <div className="input-container">
      </div>
      <div className='conten-button'>
        <button className="aplicar-button" onClick={aplicarCambios}>
          Aplicar
        </button>
        {mensaje && <div className="mensaje">{mensaje}</div>}
      </div>
    </div>
  );
}

export default AgregarProfeAdmin;
