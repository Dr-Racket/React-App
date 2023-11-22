
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
			{ title: "Agregar cursos al algoritmo", link: "/addCourseAlgorithm" },
			{ title: "Mostrar cursos en el algoritmo", link: "/viewCourseAlgorithm" },
			{ title: "Eliminar cursos del algoritmo", link: "/deleteCourseAlgorithm" }
		]
	},
	{
		title: "Profesores",
		link: "/profesores",
		options: [
			{ title: "Agregar profesores al algoritmo", link: "/AddTeacherAlgorithm" },
			{ title: "Editar preferencias de profesores", link: "/Modificarprofe" },
			{ title: "Eliminar profesores del algoritmo", link: "/deleteTeacherAlgorithm" }
		]
	},
	{
		title: "Horarios",
		link: "/horarios",
		options: [
			{ title: "Generar Horarios", link: "/HorarioGenerado" },
			{ title: "Editar Horarios Protegidos", link: "/sethorariosp" },
		]
	}
];
