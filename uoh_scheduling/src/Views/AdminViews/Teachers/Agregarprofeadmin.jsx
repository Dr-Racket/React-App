import React, { useState } from 'react';
import axios from "axios"

import { ToastContainer, toast } from 'react-toastify'; //Mensajes emergentes
import 'react-toastify/dist/ReactToastify.css';

import '../../../css/Estilosvistas.css'

function AgregarProfeAdmin() {
  const [nombre, setNombre] = useState(''); // Estado para el nombre
  const [tipo, setTipo] = useState(''); //Estado para el tipo de profesor (Adjunto, Academico, Part Time)
  const [error, setError] = useState(
    {
      nombre: '',
      tipo: '',
    }); //Estado para los errores

  const aplicarCambios = () => {
    setError({
      nombre: '',
      tipo: '',
    });
    if (!nombre) {
      setError((prevState) => ({
        ...prevState,
        nombre: 'Por favor, ingrese el nombre del profesor',
      }));
    }else if (tipo === ''){
      setError((prevState) => ({
        ...prevState,
        tipo: 'Por favor, ingrese una opción'
      }));
    } else {
      // Datos del profesor a enviar
      const datosProfesor = {
        name: nombre,
        type: tipo,
      };

      // URL de tu API para agregar profesores
      const apiUrl = 'http://localhost:8000/api/postTeacher/';

      // Realizar la solicitud POST utilizando Axios
      axios
        .post(apiUrl, datosProfesor)
        .then((response) => {
          // Manejar la respuesta del servidor
          console.log('Solicitud POST exitosa:', response.data);

          //Limpiar datos
          setNombre('');
          setTipo('');

          // Mostrar la notificación emergente
          toast.success('Profesor agregado con éxito', {
            position: toast.POSITION.TOP_CENTER,
          });
        })
        .catch((error) => {
          // Manejar errores si la solicitud falla
          console.error('Error al realizar la solicitud POST:', error);
          toast.error('Error al agregar el curso', {
            position: toast.POSITION.TOP_CENTER,
          });
        });
    }
  };


  return (
    <div className="agregar-estilo-container">
      <h2>Agregar Profesor</h2>
      <div className="input-container-column">
        <div className="input-container-fila">
        <label htmlFor="nombre">Nombre:</label>
        <div className="inputText">
          <input
            type="text"
            placeholder="Introduce el nombre del profesor"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
      {error.nombre && <div className="error">{error.nombre}</div>}
      </div>
      <div className="input-container-fila">
        <label htmlFor="opcion">Tipo de profesor:</label>
        <div className="inputText">
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            <option value="">-- Seleccione una opción --</option>
            <option value="Profesor Adjunto">Profesor Adjunto</option>
            <option value="Profesor Part Time">Profesor Part Time</option>
            <option value="Académico">Académico</option>
          </select>
        </div>
        {error.tipo && <div className="error">{error.tipo}</div>}
      </div>
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
      </div>
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default AgregarProfeAdmin;
