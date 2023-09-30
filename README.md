# React-App

-1. Inicializamos cmd.

0. Nos situamos en la carpeta uoh-frontend.
1. Creamos la imagen con: docker build -t uoh-frontend . (NOTA: El punto es el PATH)
2. Corremos en el puerto declarado en el dockerfile: docker run -d -p 3000:3000 uoh-frontend


-2. Se agrega docker-compose para mejor control de paquetes.

0. sudo docker compose up --build --no-recreate -d
1. sudo docker compose up -d
2. sudo docker exec -it uoh_vite_docker sh
3. npm i
4. npm run dev

## UPDATE

### Creación de NavBar y Sidebar

#### Nuevos elementos: 

0. .contentDistribution en index.css: Finalidad: Organización de sidebar y las vistas.
1. App.jsx: Se volvió a agregar el control de rutas en App.jsx debido a: falta implementación login.
2. layout/Sidebar.jsx: Código sidebar.
3. layout/SidebarData.jsx: Datos de sidebar. Contienen: titulo: "Titulo" , link: "/link", opciones [{title: , link:}].
4. css/Home.css: Testeo vistas luego del diseño de sidebar.
5. component_styles.css: Cambio de nombre a navbar_styles.css.
6. Cambio de nombre a navbar -> Navbar
7. index.css: Se quitó la implementación de tailwind y se aplicó la original.

### Ideas y Siguientes pasos:

0. Aplicación Combobox a contenidos de sidebar.
1. Implementación vistas creadas por el equipo.
2. Mejorar Ruteo.
3. Comenzar con la vista de login.
4. Implementar tailwind.
5. Agregar onClick a categorías para llevar a vistas respectivas.


