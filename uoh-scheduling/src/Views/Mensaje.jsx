import React from 'react'

import '../css/Formulario.css'

const Mensaje = ({mensaje, tipo}) => (
    <p className='{tipo}'> {mensaje}</p>
);