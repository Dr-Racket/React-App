import React, { useState } from 'react';

import '../../css/Estilosvistas.css'

function Agregarcurso() {
  const [horario, setHorario] = useState([
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
  ]);

  const [semestre, setSemestre] = useState('');
  const [curso, setCurso] = useState('');   // Estado para el curso
  const [mensaje, setMensaje] = useState(''); // Estado para el mensaje

  const horas = [
    '08:30 - 10:00',
    '10:15 - 11:45',
    '12:00 - 13:30',
    '14:30 - 16:00',
    '16:15 - 17:45',
    '18:00 - 19:30',
  ];

  const handleSemestreChange = (e) => {
    setSemestre(e.target.value); // Actualiza el estado del semestre seleccionado
  };

  const aplicarCambios = () => {
    if (!curso) {
      // Si no se proporciona nombre o curso, muestra el mensaje de error
      setMensaje('Por favor, ingrese un nombre para el curso');
    }
    else {
      // Aquí puedes agregar la lógica para aplicar los cambios al profesor
      // Por ahora, simplemente establecemos el mensaje de éxito
      setMensaje('Aplicado exitosamente');
    }
  };

  return (
    <div className="agregar-estilo-container">
      <h2>Agregar Curso</h2>
      {/* Combobox para seleccionar el semestre */}

      <div className="semestre-select">
        <label>Semestre:</label>
        <select value={semestre} onChange={handleSemestreChange}>
          <option value="Semestre 1">Semestre 1</option>
          <option value="Semestre 2">Semestre 2</option>
        </select>
      </div>

      <div className="input-container">
        <label>Nombre:</label>
        <input 
          type="text"
          placeholder="Introduce el nombre del Curso"
          value={curso}
          onChange={(e) => setCurso(e.target.value)}
        />
      </div>
      <div className="horario-container">
        <h2>Seleccione las preferencias de los horarios del curso:</h2>
        <div className="horario-wrapper">
          <div className="horario-horas">
            {horas.map((hora, index) => (
              <div key={index} className="hora-nombre">
                {hora}
              </div>
            ))}
          </div>
          <table className="horario-table">
            <thead>
              <tr>
                <th>Lunes</th>
                <th>Martes</th>
                <th>Miércoles</th>
                <th>Jueves</th>
                <th>Viernes</th>
              </tr>
            </thead>
            <tbody>
              {horario.map((fila, filaIndex) => (
                <tr key={filaIndex}>
                  {fila.map((casilla, casillaIndex) => (
                    <td
                      key={casillaIndex}
                      className={casilla ? 'seleccionado' : ''}
                      onClick={() => {
                        const nuevoHorario = [...horario];
                        nuevoHorario[filaIndex][casillaIndex] = !casilla;
                        setHorario(nuevoHorario);
                      }}
                    ></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
export default Agregarcurso;
