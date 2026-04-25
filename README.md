# Control Ganadero - Aplicación Web (Frontend + Backend)

Aplicación web para la gestión de bovinos que permite realizar operaciones CRUD, autenticación de usuarios y visualización de datos.  
El proyecto está desarrollado con una arquitectura desacoplada (Frontend + Backend).

---

# Enlaces del Proyecto

- 🔗 Frontend (Producción):  
  https://meligalvis.github.io/control-ganadero/frontend/index.html  

- 🔗 Backend (API):  
  https://control-ganadero-api.onrender.com  

---

# 📁 Estructura del Proyecto

---

# 1. Requisitos de Ejecución (Local)

## 🔹 Backend

1. Ingresar a la carpeta backend:
    cd backend
2. Instalar dependencias:
    npm install
3. Crear archivo `.env` con:
    MONGO_URI=mongodb+srv://meligalvismontes_db_user:3215655084Meli.@clusterganadero.elm4r6s.mongodb.net/NOMBRE_DB
    MONGO_URI=
    PORT=3000
4. Ejecutar servidor:
    node server.js

---

## 🔹 Frontend

Desde la raíz del proyecto ejecutar:
    npx serve

Luego abrir en el navegador la URL generada (ej: http://localhost:3000 o similar).

---

# 2. Diccionario de Endpoints

## Autenticación

### POST /api/login
Inicia sesión de usuario.

Request:
```json
{
  "username": "admin",
  "password": "1234"
}

POST /api/usuarios

Crea un nuevo usuario.
{
  "username": "usuario1",
  "password": "1234"
}

GET /api/bovinos
[
  {
    "_id": "1",
    "nombre": "Lola",
    "edad": 3,
    "raza": "Holstein",
    "genero": "Hembra"
  }
]

PUT /api/bovinos/:id

Actualiza un bovino.

DELETE /api/bovinos/:id

Elimina un bovino.

# 3. Evidencia de Pruebas (Postman)

Las pruebas del API se encuentran en la carpeta:
/pruebas-postman

# 4. Explicación del DOM (Frontend)

El frontend está desarrollado con JavaScript puro manipulando el DOM.

🔹 Funcionamiento
    * Se valida la sesión usando localStorage
    * Se cargan los datos mediante fetch desde la API
    * Se renderiza dinámicamente la tabla de bovinos
    * Se utilizan eventos para:
        Crear registros
        Editar registros
        Eliminar registros

Base de Datos

Se incluye una carpeta:
    /database-json
Contiene archivos JSON con datos de ejemplo de MongoDB para referencia o pruebas.

Notas Finales
    * El sistema funciona en modo online (MongoDB) y offline (datos simulados).
    * Se implementó comunicación real entre frontend y backend mediante fetch.
    * La aplicación está desplegada en producción usando:
        Frontend: GitHub Pages
        Backend: Render