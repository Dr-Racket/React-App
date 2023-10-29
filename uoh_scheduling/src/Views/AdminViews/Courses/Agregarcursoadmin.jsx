import React, { useState } from 'react';
import axios from "axios"

import { ToastContainer, toast } from 'react-toastify'; //Mensajes emergentes
import 'react-toastify/dist/ReactToastify.css';

import '../../../css/Estilosvistas.css'

function AgregarCursoAdmin() {
  const [nombre, setNombre] = useState(''); // Estado para el nombre
  const [codigo, setCodigo] = useState(''); // Estado para el codigo
  const [semestre, setSemestre] = useState(''); // Estado para el semestre
  const [semestrecareer, setSemestrecareer] = useState(''); //Estado para el semestre de la carrera
  const [catedra, setCatedra] = useState(''); // Estado para la catedra
  const [ayudantia, setAyudantia] = useState(''); // Estado para la ayudantia
  const [errores, setErrores] = useState({ //Estado para los errores
    nombre: '',
    codigo: '',
    semestre: '',
    semestrecareer: '',
    catedra: '',
    ayudantia: '',
  }); 
  
  
  const aplicarCambios = () => {
    
    setErrores({
      nombre: '',
      codigo: '',
      semestre: '',
      semestrecareer: '',
      catedra: '',
      ayudantia: '',
    });
    if (!nombre.trim()) {
      setErrores((prevState) => ({
        ...prevState,
        nombre: 'Por favor, ingrese el nombre del curso',
      }));
      return;
    }
    else if (!codigo.trim()) {
      setErrores((prevState) => ({
        ...prevState,
        codigo: 'Por favor, ingrese un código',
      }));
      return;
    }
    else if (semestre !== '1' && semestre !== '2') {
      setErrores((prevState) => ({
        ...prevState,
        semestre: 'El semestre debe ser 1 o 2',
      }));
      return;
    }
    else if (!semestrecareer.trim() ||isNaN(semestrecareer) || semestrecareer < 1 || semestrecareer > 10){
      setErrores((prevState) => ({
        ...prevState,
        semestrecareer: 'El semestre debe estar entre 1 y 10'
      }));
      return;
    }
    else if (!catedra.trim() || isNaN(catedra)) {
      setErrores((prevState) => ({
        ...prevState,
        catedra: 'Por favor, ingrese la cantidad de cátedras como número',
      }));
      return;
    }
    else if (!ayudantia.trim() || isNaN(ayudantia)) {
      setErrores((prevState) => ({
        ...prevState,
        ayudantia: 'Por favor, ingrese la cantidad de ayudantías como número',
      }));
      return;
    }
    else {
      // Datos del curso a enviar
      const datosCurso = {
        name: nombre,
        code: codigo,
        semester: semestre,
        semesterincareer: semestrecareer,
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

          //Limpiar los campos
          setNombre('');
          setCodigo('');
          setSemestre('');
          setSemestrecareer('');
          setCatedra('');
          setAyudantia('');


          // Mostrar la notificación emergente
          toast.success('Curso agregado con éxito', {
            position: toast.POSITION.TOP_CENTER,
          });
        })
        .catch((error) => {
          console.error('Error al realizar la solicitud POST:', error);
          // Manejar errores si la solicitud falla
          toast.error('Error al agregar el curso', {
            position: toast.POSITION.TOP_CENTER,
          });
        });

    }
  };


  return (
    <div className="agregar-estilo-container">
      <h2>Agregar Curso</h2>
      <div className="input-container-column">
        <div className="input-container-fila">
          <label htmlFor="nombre">Nombre:</label>
          <div className="inputText">
            <input
              id="nombre"
              type="text"
              placeholder="Introduce el nombre del curso"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          {errores.nombre && <div className="error">{errores.nombre}</div>}
        </div>
        <div className="input-container-fila">
          <label htmlFor="codigo">Código:</label>
          <div className="inputText">
            <input
              id="codigo"
              type="text"
              placeholder="Introduce el código del curso"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
            />
          </div>
          {errores.codigo && <div className="error">{errores.codigo}</div>}
        </div>
        <div className="input-container-fila">
          <label htmlFor="semestre">Semestre:</label>
          <div className="inputText">
            <input
              id="semestre"
              type="text"
              placeholder="Introduce el semestre del curso (1 o 2)"
              value={semestre}
              onChange={(e) => setSemestre(e.target.value)}
            />
          </div>
          {errores.semestre && <div className="error">{errores.semestre}</div>}
        </div>
        <div className="input-container-fila">
          <label htmlFor="semestrec">Semestre en la carrera:</label>
          <div className="inputText">
            <input
              id="semestrec"
              type="text"
              placeholder="Introduce el semestre de acuerdo a la malla: "
              value={semestrecareer}
              onChange={(e) => setSemestrecareer(e.target.value)}
            />
          </div>
          {errores.semestrecareer && <div className="error">{errores.semestrecareer}</div>}
        </div>
        <div className="input-container-fila">
          <label htmlFor="catedras">Cátedras:</label>
          <div className="inputText">
            <input
              id="catedras"
              type="text"
              placeholder="Introduce la cantidad de cátedras del curso"
              value={catedra}
              onChange={(e) => setCatedra(e.target.value)}
            />
          </div>
          {errores.catedra && <div className="error">{errores.catedra}</div>}
        </div>
        <div className="input-container-fila">
          <label htmlFor="ayudantias">Ayudantías:</label>
          <div className="inputText">
            <input
              id="ayudantias"
              type="text"
              placeholder="Introduce la cantidad de ayudantías del curso"
              value={ayudantia}
              onChange={(e) => setAyudantia(e.target.value)}
            />
          </div>
          {errores.ayudantia && (
            <div className="error">{errores.ayudantia}</div>
          )}
        </div>
      </div>
      <div className="conten-button">
        <button className="aplicar-button" onClick={aplicarCambios}>
          Aplicar
        </button>
      </div>
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default AgregarCursoAdmin;
