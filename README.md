# API Rest para sistema de requerimientos.

Este proyecto fue desarrollado para generar una API Rest utilizando NodeJS, para el sistema de requerimientos de desarrollo para la prueba técnica de Alliot.
El desarrollo considera la utilización de BabelJS, para mejorar la compatibilidad con Javascript moderno al momento de desarrollar.
[ver](https://babeljs.io)

## Configuraciones

Este proyecto tiene contiene un archivo de .env que almacena las variables de entorno del proyecto, para definir el puerto donde se levantará el servicio y los datos de la base de datos (se consideró al momento de pasar a docker), el formato del archivo es el siguiente:

PORT=(Puerto donde se levantará la API)

DB_HOST=(Host de la base de datos)

DB_USER=(usuario de base de datos con privilegios necesarios)

DB_PASSWORD=(clave del usuario de base de datos)

DB_PORT=(puerto de la base de datos)

DB_NAME=(nombre de la base de datos MongoDB)

## Scripts

En el directorio del proyecto podrás ejecutar:

### `npm run test`

Este comando se utiliza para ejecutar las pruebas unitarias (los test se hicieron utilizando [Supertest](https://github.com/visionmedia/supertest) con [Mocha](https://mochajs.org)).
Existe un archivo llamado configtest.js que define algunos datos de prueba, no es necesario modificarlo, pero es posible si es que lo deseas.

### `npm run dev`

Ejecutará la api en modo desarrollo, donde existen paquetes instalados como nodemon para reiniciar automáticamente al generar un cambio.

### `npm run build`

Puesto que este proyecto fue desarrollado usando babel, para compatibilidad, se debe construir al momento de pasar a producción, ya que de esta forma se transpilar el código y puede ser ejecutado sin problemas. (Se genera un directorio build con el código generado por babeljs)

### `npm start`

Luego de ser construido el proyecto para producción se debe utilizar este comando para iniciar el servicio.

## Docker

Este proyecto fue dockerizado, para su ejecución en una imagen de docker con todos sus requerimientos incluidos en la definición (Dockerfile)

### `docker build -t node-restapi .`

Comando para crear la imagen desde el Dockerfile

### `docker images`

Comando opcional para ver si la imagen fue descargada correctamente.

### `docker run -it -p 4000:4000 node-restapi`

Comando para levantar la imagen de docker que contiene este proyecto, se expone el puerto 4000 en la imagen y en el equipo local.
Si la imagen se levantó localmente, se puede revisar en http://localhost:4000

## Notas:

Puesto que el proyecto web no considera un formulario de registro, se debe utilizar un cliente rest para generar el primer usuario con los siguientes datos:

URL: http://localhost:4000/auth/signup

Entrada en formato JSON:

{

"username": "nombre de usuario",

"password": "clave para el usario",

"name": "Nombre completo del usuario",

"pictureUrl": "Avatar o imagen asociada al usuario, esta debe ser una URL"

}

Acá va un ejemplo usando el cliente Insomnia:

![Ejemplo de registro de un usuario usando el cliente Insomnia](https://raw.githubusercontent.com/rodrigovizcarra/reqiot-api/main/src/assets/demosignupuser.png)

## Prerequisitos:

Este proyecto utiliza como base de datos MongoDB, conexión que debe ser configurada en un archivo .env (como se menciona anteriormente) y para Docker se debe instalar Docker en la máquina donde se ejecutará el proyecto.

- Mongo DB

[Instalación MongoDB en MacOS](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)

[Instalación MongoDB en Windows](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)

[Instalación MongoDB en Linux](https://docs.mongodb.com/manual/administration/install-on-linux/)

- Mongo Docker

[Instalación Docker en MacOS](https://docs.docker.com/docker-for-mac/install/)

[Instalación Docker en Windows](https://docs.docker.com/docker-for-windows/install/)

[Instalación Docker en Linux - Ubuntu - Se puede navegar para otras distribuciones.](https://docs.docker.com/engine/install/ubuntu/)
