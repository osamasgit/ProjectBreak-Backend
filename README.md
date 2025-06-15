# Tienda de Ropa - API y Panel de Administración

Este proyecto es una aplicación web para gestionar un catálogo de productos de ropa, incluyendo autenticación básica para el acceso al panel de administración. Permite crear, leer, actualizar y eliminar productos, así como visualizar los productos por categorías.

## Tecnologías utilizadas

- Node.js  
- Express.js  
- MongoDB (Mongoose)  
- Multer + Cloudinary (para subir imágenes)  
- Express-session (para manejo de sesiones y autenticación)  
- dotenv (para variables de entorno)

## 🔧 Requisitos previos

Antes de iniciar asegúrate de tener:

- Node.js instalado.
- MongoDB Atlas o local funcionando.
- Cuenta en Cloudinary creada.
- Archivo `.env` correctamente configurado.

---

## ⚙ Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
PORT=3000
MONGODB_URI=tu_uri_de_mongodb
CLOUDINARY_CLOUD_NAME=tu_nombre_de_cloudinary
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
SESSION_SECRET=una_clave_secreta_para_sesiones
ADMIN_USER=admin_username
ADMIN_PASSWORD=admin_password
```

---

## Instalación

### 1️⃣ Clonar el repositorio

```bash
git clone <repositorio>
cd <nombre_del_proyecto>
```

### 2️⃣ Instalar dependencias

```bash
npm install
```

### 3️⃣ Configurar variables de entorno

Asegúrate de haber creado el archivo `.env` como se indicó.

### 4️⃣ Iniciar la aplicación

```bash
npm start
```

Por defecto, el servidor estará disponible en:

```
http://localhost:3000/
```

---

## 🗂 Estructura del proyecto

```bash
project/
│
├── config/           # Configuración de DB y Cloudinary
├── controllers/      # Lógica de negocio
├── helpers/          # Templates HTML (render manual)
├── middlewares/      # Middlewares (auth, multer, etc.)
├── models/           # Modelos de datos con Mongoose
├── routes/           # Rutas de la API
├── public/           # Archivos estáticos
├── .env              # Variables de entorno (NO subir al repo)
├── .gitignore
├── index.js          # Archivo principal del servidor
└── package.json
```

---

## 📡 Endpoints de la API

### 🔑 Autenticación

| Método | Ruta    | Descripción |
|--------|---------|-------------|
| GET    | `/login`  | Mostrar formulario de login |
| POST   | `/login`  | Iniciar sesión (valida con ADMIN_USER / ADMIN_PASSWORD) |
| GET    | `/logout` | Cerrar sesión |

### 📦 Productos públicos (sin autenticación)

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/products` | Mostrar todos los productos |
| GET | `/products/category/:category` | Filtrar por categoría |
| GET | `/products/:productId` | Mostrar detalle de producto |

> Si la cabecera `Accept` es `application/json` se devuelve la respuesta en formato JSON.

### 🛠 Panel de administración (requiere login)

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/dashboard` | Mostrar todos los productos |
| GET | `/dashboard/category/:category` | Filtrar por categoría |
| GET | `/dashboard/new` | Formulario para nuevo producto |
| POST | `/dashboard` | Crear nuevo producto |
| GET | `/dashboard/:productId` | Ver detalle |
| GET | `/dashboard/:productId/edit` | Editar producto |
| PUT | `/dashboard/:productId` | Actualizar producto |
| DELETE | `/dashboard/:productId` | Eliminar producto |

---

## 🗃 Esquema de producto (Mongoose)

```javascript
{
  name: String (requerido),
  description: String (requerido),
  image: String (requerido),
  category: String (enum: ['Camisetas', 'Pantalones', 'Zapatos', 'Accesorios']),
  size: String (enum: ['XS','S', 'M', 'L', 'XL']),
  price: Number (requerido, mínimo 0)
}
```

---

## 🧩 Middleware

- `authMiddleware` → Protege rutas del dashboard (requiere autenticación).
- `uploadCloudinaryMiddleware` → Subida de imágenes a Cloudinary vía Multer.

---

## ⚠ Posibles errores comunes

- Variables de entorno mal configuradas.
- Problemas de conexión con MongoDB.
- Credenciales de Cloudinary incorrectas.

---

## 📌 Notas adicionales

- La generación de vistas es manual usando plantillas HTML dentro de la carpeta `helpers/`.
- La autenticación es simple, basada en sesión y verificación de credenciales estáticas.
- La API puede responder tanto en HTML como en JSON, dependiendo de los headers.

---