import React, { useState } from 'react';

import '../css/modificarprofe.css'

function ModificarProfe() {
  const NProfes = [
    //agregar más de ser necesarios (tengo esos de ejemplo), cambiar url de ser necesario
    {nombre: "Gonzalo", url: "www.google.com"},
    {nombre: "Paula", url: "/"},
    {nombre: "Paula", url: "/"},
    {nombre: "Paula", url: "/"},
    {nombre: "Paula", url: "/"},
  ]
  return (
    <div class="container-mprofe">
      <h2>Modificar Profesores</h2>
      <div className="container-search">
        <input
          type="text"
          placeholder="Buscar"
        />
        <button class="aplicar-button" type="submit">Buscar</button>
      </div>
      <div class="container-scroll">
        <div class="content">
          <ul>
            {NProfes.map((elemento, index) =>(
              <li key={index}>
                <a href={elemento.url}>{elemento.nombre}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ModificarProfe;
