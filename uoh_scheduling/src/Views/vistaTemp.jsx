import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import axios from "axios"

import { ToastContainer, toast } from 'react-toastify'; //Mensajes emergentes
import 'react-toastify/dist/ReactToastify.css';

function vistaTemp() {
  const [NProfes, setNProfes] = useState([]);
  const [NCursos, setNCursos] = useState([]);
      // Función para realizar la solicitud a la API
  useEffect(() => {
    const storedTeachers = localStorage.getItem("selectedTeachers")
    setNProfes((storedTeachers) ? JSON.parse(storedTeachers) : [])

    console.log(storedTeachers)

  }, []);


// REALIZAR POST POR CADA TEACHER EXISTENTE EN EL LOCAL STORAGE.

const postToAlgorithm = (datosProfesor) => {

    // Validar los datos del profesor
    if (!datosProfesor.id) {
      return alert('El campo id es obligatorio.');
    }
    if (!datosProfesor.name) {
      return alert('El campo name es obligatorio.');
    }
    if (!datosProfesor.teacher) {
      return alert('El campo teacher es obligatorio.');
    }
    if (!datosProfesor.blocks) {
      return alert('El campo blocks es obligatorio.');
    }

    // Datos correctos
    const datos = {
        id: datosProfesor.id,
        name: datosProfesor.name,
        teacher: datosProfesor.teacher,
        blocks: datosProfesor.blocks
    }
  
    // URL de tu API para agregar profesores
    const apiUrl = 'http://localhost:8000/users/postAlgorithm'
  
    // Configura el encabezado con el token de autenticación
    // Token en Orden
    const token = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
    console.log(token.access)
    const config = {
        headers: {
            Authorization: `Bearer ${token.access}`
        }
    }; 
    // Realizar la solicitud POST utilizando a los minions

    axios
      .post(apiUrl, datos, config)
      .then((response) => {
        // Manejar la respuesta del servidor
        console.log('Solicitud POST exitosa:', response.data);
  
        // Mostrar la notificación emergente
        toast.success('Profesor agregado con éxito', {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((error) => {
        // Manejar errores si la solicitud falla
        console.error('Error al realizar la solicitud POST:', error);
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
    };
  

    const postEachTeacher = () => {
        // Alg para iterar por profe
        NProfes.map((profe) => (
            postToAlgorithm(profe)
        ));
    };

  return (
    <>
      <div className='conten-button'>
        <button className="aplicar-button" onClick={postEachTeacher}>
          Aplicar
        </button>
      </div>
      </>
  );
}

export default vistaTemp;
