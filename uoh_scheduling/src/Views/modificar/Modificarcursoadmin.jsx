import React, { useState, useEffect } from 'react';
import axios from "axios"

import '../../css/Cursos.css'


function ModificarCursoAdmin() {

    return(
        <div class="agregar-estilo-container">
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
                    

        </div>

    );
}


export default ModificarCursoAdmin;
