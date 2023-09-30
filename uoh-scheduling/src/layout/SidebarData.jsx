import React from 'react';


/* CONTROL RUTAS SIDEBAR */
export const SidebarData = [

	{
		title: "Cursos",
		link: "/cursos",
		options: [
			{title: "Agregar", link: "/login"},
			{title: "Editar", link: "/"},
			{title: "Eliminar", link: ""}
		]
	},
	{
		title: "Profesores",
		link: "/profesores",
		options: [
			{title: "Agregar", link: "/Agregarprofe"},
			{title: "Editar", link: "/Formulario"},
			{title: "Eliminar", link: ""}
		]
	},
	{
		title: "Horarios",
		link: "/horarios",
		options: [
			{title: "Ver Horarios", link: ""},
			{title: "Editar Horarios Protegidos", link: ""},
		]
	}

]

