import React, { useState } from 'react';
//Vista en la cuál se modifican los cursos 

import '../css/modificarcurso.css'

function CambiarCurso() {
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
        <div class="container-cc">
            <h1>Editar Curso</h1>
            <h3 class="texto-mostrar">Nombre: Ejemplo</h3> {/*<-- ACA EL NOMBRE DEBERIA VENIR DE LA BASE DE DATOS*/}
            {/*Reutilizo el css de modificar cursos*/}
            <div class="Container-Cursos-Search">
            <input
                    type='text'
                    placeholder='Nuevo Nombre'
                />
                <button class="aplicar-button" type="submit">Cambiar</button>
            </div>
            <h3 class="texto-mostrar">Modificar las preferencias del horario del curso</h3>
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
            <button type="submit" class="aplicar-button">
                Aplicar
            </button>

        </div>

    );
}

export default CambiarCurso;