import {BrowserRouter, Routes, Route} from "react-router-dom"
import React, { useState} from 'react';
import Navbar from "../layout/Navbar.jsx"
import Login from "../Views/Login"

import Mensaje from './Mensaje';

import '../css/Formulario.css'

const Formulario = ({listaramos, setListaRamos}) => {
    //Generar id de cada materia
    const shortid = require('shortid');
    const id = shortid.generate();

    //UseStates
    const [ramo, setRamo] = useState({
        //Inputs requeridos en caso de faltar agregar
        id: id,
        nombre: '',
        profesor: '',
        catedras: -1,
        ayudantias: -1,
        laboratorios: -1,
        selected: false
    });

    const [mensaje, setMensaje] = useState({
        show:false,
        mensaje: '',
        tipo: ''
    });

    //Extraer los valores del ramo
    const {
        nombre, profesor, catedras,
                        ayudantias,
                        laboratorios    
    } = ramo

    //Funciones
    const onChange = e => {

        setRamo({
            ...ramo,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e =>{
        e.preventDefault();

        //Si el ramo no tiene nombre
        if(nombre.trim() == ''){
            setMensaje({show: true, mensaje:"Por favor, ingrese un nombre al ramo", tipo:"error"});
            setTimeout(() =>{
                setMensaje({show: false, mensaje:"Por favor, ingrese un nombre al ramo", tipo:"error"});
            }, 3000)
            return null
        }

        //Si el ramo no tiene catedras
        if(catedras !== -1 || catedras == 0){
            setMensaje({show: true, mensaje:"Por favor, ingrese un número positivo de catedras (mayor a 0)", tipo:"error"});
            setTimeout(() =>{
                setMensaje({show: false, mensaje:"Por favor, ingrese un número positivo de catedras (mayor a 0)", tipo:"error"});
            }, 3000)
            return null
        }
        //Quitar el error
        setMensaje({show:false, mensaje:"",tipo:""})

        //Guardar los ramos
        setListaRamos([
            ...listaramos,
            ramo
        ])

        //Mostrar mensaje de exito
        setMensaje({show:true, mensaje: `Materia ${nombre} Agregada Correctamente`, tipo:"success"});
            setTimeout(() =>{
                setMensaje({show:false, mensaje: `Materia ${nombre} Agregada Correctamente`, tipo:"success"});
            })
        
        limpiar();
    }

    const limpiar = () =>{
        const id = shortid.generate();
        setRamo({
            id: id,
            nombre: '',
            profesor: '',
            catedras: -1,
            ayudantias: -1,
            laboratorios: -1,
            selected: false
        })
    }
    //ingreso de datos --> Nombre ramo, Profesor, Catedras, Ayudantias, Labs
    return (
        <form onSubmit={onSubmit}>
            {(mensaje.show) ? <Mensaje mensaje={mensaje.mensaje} tipo={mensaje.tipo}/> :null}
            <div>
                <input
                    type="text"
                    name="nombre"
                    id="nombre"
                    value={nombre}
                    onChange={onChange}
                />
                <label>Nombre Ramo: </label>
            </div>
            <div>
                <input
                    type="text"
                    name="profesor"
                    id="profesor"
                    value={profesor}
                    onChange={onChange}
                />
                <label>Nombre Profesor: </label>
            </div>
            <div>
                <input
                    type='number'
                    name="catedras"
                    id="catedras"
                    value={catedras}
                    onChange={onChange}
                />
                <label>N° Catedras: </label>
            </div>
            <div>
                <input
                    type='number'
                    name="ayudantias"
                    id="ayudantias"
                    value={ayudantias}
                    onChange={onChange}
                />
                <label>N° Ayudantias: </label>
            </div>
            <div>
                <input
                    type='number'
                    name="laboratorios"
                    id="laboratorios"
                    value={laboratorios}
                    onChange={onChange}
                />
                <label>N° Laboratorios: </label>
            </div>
            <div>
                <button
                    type="submit"
                    value="Ingresar Ramo"
                >Ingresar Ramo</button>
            </div>
        </form>
    );
}

export default Formulario;