import React,{ useState } from 'react';

import '../css/modificarcurso.css'

function ModificarCurso() {
    const NCursos =[
        //agregar más de ser necesarios (tengo esos de ejemplo), cambiar url de ser necesario
        {nombre: "Computación Gráfica", codigo:"C1", semestre:"1" ,url: "/"},
        {nombre: "Teoria de la Computación", codigo:"C2", semestre:"2" ,url: "/"},
        {nombre: "Matematicas Discretas", codigo:"C3", semestre:"1" ,url: "/"},
        {nombre: "Ciencias e Ingenieria Computacional", codigo:"C4", semestre:"4" ,url: "/"},
    ]
    return(
        <div class="Container-Cursos">
            <h2>Modificar Cursos</h2>
            <div class="Container-Cursos-Search">
                <input
                    type='text'
                    placeholder='Buscar el curso a modificar'
                />
                <button class="aplicar-button" type="submit">Buscar</button>
            </div>
            <div class="Container-Scroll">
                <div class="Content-Cursos">
                    <ul>
                        {NCursos.map((elemento, index) =>(
                            <li key={index}>
                                <a class="link" href={elemento.url}>{elemento.nombre} - {elemento.codigo}-{elemento.semestre} </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

    );
}


export default ModificarCurso;
