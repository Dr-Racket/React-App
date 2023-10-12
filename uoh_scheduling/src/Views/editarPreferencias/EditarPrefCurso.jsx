import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import '../../css/Cursos.css'

function Editarprefcurso() {

    // OBTENCION PARAMETROS
    const { curso } = useParams();

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

    return(
        <>
        <div className="container-cc">
            <h1>Preferencias Horario: { curso }</h1>
            {/*Reutilizo el css de modificar cursos*/}
            <h3 className="texto-mostrar">Modificar las preferencias del horario del curso</h3>
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
            {/*BOTON*/}
            <button type="submit" className="aplicar-button">
                Aplicar
            </button>

            </div>
        </>
    );
}

export default Editarprefcurso;
