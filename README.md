# Configuración App
Este repositorio crea un proyecto en blanco inicial con **NodeJS, Express y MongoDB**, con variables de entorno.

## Pasos a seguir:
 - Clonar repositorio: `git@github.com:merchedev/nem-init.git`
 - `npm ci`
 - Configurar archivos ***.env*** dentro de la carpeta ***'/config'***.
 - Configurar archivo ecosystem (cambiar nombre app)
 - ***Añadir*** las ***rutas, controladores y validadores*** necesarios en sus respectivas carpetas e ***indicar las rutas en app.js***.

 Para iniciar un nuevo repositorio diferente a partir de este:
 - Crear el nuevo repositorio en github.
 - Enlazarlo con el proyecto: `git remote set-url origin url_de_tu_nuevo_repositorio`


## Para ejecutar la aplicación:

### Ejecutar en modo desarrollo (Linux/Mac)

    npm start

### Ejecutar en modo desarrollo (Windows)

    npm run windev

### Ejecutar en modo producción (Linux/Mac)

    npm run prod

### Ejecutar en modo producción (Windows)

    npm run winprod

