
export const SidebarDataAdmin = [

	{
		title: "Administrar Cursos",
		link: "/Administrarcursos",
		options: [
			{ title: "Agregar a la base de datos", link: "/postCurso" },
			{ title: "Eliminar de la base de datos", link: "/Eliminarcurso" }
		]
	},
	{
		title: "Administrar Profesores",
		link: "/Administrarprofesores",
		options: [
			{ title: "Agregar a la base de datos", link: "/postProfesor" },
			{ title: "Eliminar de la base de datos", link: "/Eliminarprofe" }
		]
	},
	{
		title: "Cursos",
		link: "/cursos",
		options: [
			{ title: "Agregar", link: "/addCourseAlgorithm" },
			{ title: "Editar", link: "Modificarcurso" },
			{ title: "Eliminar", link: "/deleteCourseAlgorithm" }
		]
	},
	{
		title: "Profesores",
		link: "/profesores",
		options: [
			{ title: "Agregar", link: "/AddTeacherAlgorithm" },
			{ title: "Editar", link: "/Modificarprofe" },
			{ title: "Eliminar", link: "/DeleteTeacherAlgorithm" }
		]
	},
	{
		title: "Horarios",
		link: "/horarios",
		options: [
			{ title: "Ver Horarios", link: "/HorarioGenerado" },
			{ title: "Editar Horarios Protegidos", link: "/sethorariosp" },
		]
	}
];
