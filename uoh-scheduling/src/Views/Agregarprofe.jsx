import {BrowserRouter, Routes, Route} from "react-router-dom"
import React, { useState } from 'react';
import Navbar from "../layout/Navbar.jsx"
import Login from "../Views/Login"

import '../css/Agregarprofe.css'

function Agregarprofe() {
  const [horario, setHorario] = useState([
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
  ]);

  const horas = [
    '08:30 - 10:00',
    '10:15 - 11:45',
    '12:00 - 13:30',
    '14:30 - 16:00',
    '16:15 - 17:45',
    '18:00 - 19:30',
  ];

  return (
    <div className="agregar-profe-container">
      <h1>Agregar profesor</h1>
      <div className="input-container">
        <label>Nombre:</label>
        <input type="text" placeholder="Introduce el nombre del profesor" />
      </div>
      <div className="horario-container">
        <h2>Horario:</h2>
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
      <div className="input-container">
        <label>Curso a impartir:</label>
        <input type="text" placeholder="Introduce el curso" />
      </div>
      <button className="aplicar-button">Aplicar</button>
    </div>
  );
}

export default Agregarprofe;


