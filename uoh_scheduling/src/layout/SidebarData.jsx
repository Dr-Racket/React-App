import React, { useContext } from 'react';
import AuthContext from '../AuthContext';

const { user } = useContext(AuthContext);

/* CONTROL RUTAS SIDEBAR */
export const SidebarData = [

	{
		title: "Cursos",
		link: "/cursos",
		options: [
			{ title: userIsAdmin ? "Agregar" : "AgregarCurso", link: userIsAdmin ? "/postCurso" : "/AgregarCurso" },
			{ title: "Editar", link: "/Modificarcurso" },
			{ title: "Eliminar", link: "/Eliminarcurso" }
		]
	},
	{
		title: "Profesores",
		link: "/profesores",
		options: [
			{ title: userIsAdmin ? "Agregar" : "AgregarProfesor", link: userIsAdmin ? "/postProfesor" : "/AgregarProfesor" },
			{ title: "Editar", link: "/Modificarprofe" },
			{ title: "Eliminar", link: "/Eliminarprofe" }
		]
	},
	{
		title: "Horarios",
		link: "/horarios",
		options: [
			{ title: "Ver Horarios", link: "" },
			{ title: "Editar Horarios Protegidos", link: "" },
		]
	}
];

