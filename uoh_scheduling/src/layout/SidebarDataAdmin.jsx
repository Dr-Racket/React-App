
export const SidebarDataAdmin = [

	{
		title: "Administrar Cursos",
		link: "/Administrarcursos",
		options: [
			{ title: "Agregar", link: "/postCurso" },
			{ title: "Eliminar", link: "/Eliminarcurso" }
		]
	},
	{
		title: "Administrar Profesores",
		link: "/Administrarprofesores",
		options: [
			{ title: "Agregar", link: "/postProfesor" },
			{ title: "Eliminar", link: "/Eliminarprofe" }
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
			{ title: "Ver Horarios", link: "/404" },
			{ title: "Editar Horarios Protegidos", link: "/sethorariosp" },
		]
	}
];
