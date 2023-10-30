import React, { useState } from 'react';
import axios from "axios"
import { useParams } from 'react-router-dom';

function HorarioGenerado() {

    const sendDataToAPI = () => {
        // Obtener los datos del localStorage que deseas enviar
        const selectedTeachers = JSON.parse(localStorage.getItem('selectedTeachers'));
        const selectedCourses = JSON.parse(localStorage.getItem('selectedCourses'));
    
        // Crear un objeto con los datos a enviar
        const dataToSend = {
          selectedTeachers,
          selectedCourses,
        };
    
        // Realizar una solicitud POST a la API para enviar los datos
        console.log(selectedTeachers)
        axios
          .post('http://127.0.0.1:8000/api/postAlgorithm', selectedTeachers)
          .then((response) => {
            // Manejar la respuesta de la API si es necesario
            console.log('Datos enviados con éxito:', response.data);
          })
          .catch((error) => {
            // Manejar los errores de la solicitud
            console.error('Error al enviar datos a la API:', error);
          });
      };
    
      return (
        <div className="agregar-estilo-container">
            <h1>Hola Mundo!</h1>
          <button onClick={sendDataToAPI}>Enviar Datos a la API</button>
        </div>
      );

}
export default HorarioGenerado;