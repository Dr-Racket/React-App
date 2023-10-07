import React, { useState } from 'react';
import axios from "axios"

import '../css/Estilosvistas.css'

function AgregarCursoAdmin() {
  const [nombre, setNombre] = useState(''); // Estado para el nombre
  const [codigo, setCodigo] = useState(''); // Estado para el codigo
  const [semestre, setSemestre] = useState(''); // Estado para el semestre
  const [catedra, setCatedra] = useState(''); // Estado para la catedra
  const [ayudantia, setAyudantia] = useState(''); // Estado para la ayudantia
  const [mensaje, setMensaje] = useState(''); // Estado para el mensaje
  
  const aplicarCambios = () => {
    if (!nombre) {
      setMensaje('Por favor, ingrese el nombre del curso');
    }
    else if (!codigo) {
      setMensaje('Por favor, ingrese un codigo');
    }
    else if (!semestre) {
      setMensaje('Por favor, ingrese el semestre');
    }
    else if (!catedra) {
      setMensaje('Por favor, ingrese cantidad de catedra');
    }
    else if (!ayudantia) {
      setMensaje('Por favor, ingrese cantidad de ayudantia');
    }
    else {
      // Datos del curso a enviar
      const datosCurso = {
        name: nombre,
        code: codigo,
        semester: semestre,
        catedras: catedra,
        ayudantias: ayudantia,
      };

      // URL de tu API para agregar profesores
      const apiUrl = 'http://localhost:8000/api/postCourse/';

      // Realizar la solicitud POST utilizando Axios
      axios
        .post(apiUrl, datosCurso)
        .then((response) => {
          // Manejar la respuesta del servidor
          console.log('Solicitud POST exitosa:', response.data);
          setMensaje('Curso agregado con éxito.');
        })
        .catch((error) => {
          // Manejar errores si la solicitud falla
          console.error('Error al realizar la solicitud POST:', error);
        });
    }
  };


  return (
    <div className="agregar-estilo-container">
      <h2>Agregar Curso</h2>
      <div className="input-container-column">
        <div className="input-container-fila">
          <label for="nombre">Nombre:</label>
          <div className='inputText'>
            <input id="nombre"
              type="text"
              placeholder="Introduce el nombre del curso"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
        </div>
        <div className="input-container-fila">
          <label for="codigo">Codigo:</label>
          <div className='inputText'>
            <input id="codigo"
              className='inputText'
              type="text"
              placeholder="Introduce el codigo del curso"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
            />
          </div>
        </div>
        <div className="input-container-fila">
          <label for="semestre">Semestre:</label>
          <div className='inputText'>
            <input id="semestre"
              className='inputText'
              type="text"
              placeholder="Introduce el semestre del curso"
              value={semestre}
              onChange={(e) => setSemestre(e.target.value)}
            />
          </div>
        </div>
        <div className="input-container-fila">
          <label for="catedras">Catedras:</label>
          <div className='inputText'>
            <input id="catedras"
              className='inputText'
              type="text"
              placeholder="Introduce el numero de catedras del curso"
              value={catedra}
              onChange={(e) => setCatedra(e.target.value)}
            />
          </div>
          </div>
          <div className="input-container-fila">
          <label for="ayudantias">Ayudantias:</label>
          <div className='inputText'>
            <input id="ayudantias"
              className='inputText'
              type="text"
              placeholder="Introduce el numero de Ayudantias del curso"
              value={ayudantia}
              onChange={(e) => setAyudantia(e.target.value)}
            />
          </div>
          </div>
      </div>
      <div className="horario-container">
        <h2>Es responsabilidad de usted que los datos del curso sean correctos.</h2>
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

export default AgregarCursoAdmin;
