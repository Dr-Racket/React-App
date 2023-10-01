import React from 'react';


/* CONTROL RUTAS SIDEBAR */
export const SidebarData = [

	{
		title: "Cursos",
		link: "/cursos",
		options: [
			{title: "Agregar", link: "/Agregarcurso"},
			{title: "Editar", link: "/Modificarcurso"},
			{title: "Eliminar", link: ""}
		]
	},
	{
		title: "Profesores",
		link: "/profesores",
		options: [
			{title: "Agregar", link: "/Agregarprofe"},
			{title: "Editar", link: "/Modificarprofe"},
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
