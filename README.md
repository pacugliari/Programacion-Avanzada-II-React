
# 🎬 Cliente Web - Programación Avanzada II

Este proyecto corresponde al **frontend** del sistema de gestión de películas desarrollado para la materia _Programación Avanzada II_. Se trata de una **aplicación web construida con React + Vite + TypeScript**, diseñada para interactuar con una API RESTful (con autenticación JWT) desarrollada como parte del mismo sistema.

---

## 📌 Propósito

Este cliente permite a los usuarios autenticarse, visualizar películas, crear nuevas, editarlas, ver detalles y más. Toda la lógica de negocio y almacenamiento de datos se delega al backend (API), al cual este frontend se conecta a través de peticiones HTTP.

---

## 🚀 Tecnologías Utilizadas

- **React** – Librería principal para la interfaz de usuario.
- **Vite** – Herramienta de desarrollo rápido para frontend moderno.
- **TypeScript** – Tipado estático que mejora la escalabilidad y mantenibilidad.
- **React Router DOM** – Navegación entre pantallas.
- **Context API** – Manejo de estado global (autenticación y spinner).
- **Fetch API** – Comunicación con la API backend.
- **CSS** – Estilos personalizados.
- **SweetAlert2** – Alertas y confirmaciones visuales.

---

## 🧩 Estructura del Proyecto

```
src/
├── app/
│   ├── context/                # Contextos globales (auth, spinner)
│   ├── modules/
│   │   ├── auth/               # Login y registro
│   │   └── movies/             # CRUD de películas (index, create, edit, detail)
│   ├── shared/                 # Helpers generales (alertas, storage, auth, http)
│   ├── App.tsx                 # Definición de rutas
│   └── Router.tsx             # Router central
├── assets/                     # Recursos (iconos, imágenes)
├── main.tsx                    # Punto de entrada de la app
```

---

## ⚙️ Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/pacugliari/Programacion-Avanzada-II-React.git
cd Programacion-Avanzada-II-React/
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Crear archivo `.env`

Crear un archivo `.env.development` con la siguiente variable:

```env
VITE_API_URL=http://localhost:3000/api
VITE_ENV=development
```

> Asegurate de que coincida con la URL de tu API backend.

---

## ▶️ Ejecución

### Modo desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: `http://localhost:5173/`

### Build producción

```bash
npm run build
```

### Previsualizar el build

```bash
npm run preview
```

---

## 🔐 Autenticación

- Se realiza mediante JWT.
- Al iniciar sesión, el token se guarda en `localStorage`.
- Las rutas protegidas verifican su validez antes de permitir el acceso.
- Al cerrar sesión, el token se elimina del almacenamiento.

---

## ✏️ Funcionalidades

- **Login / Registro de usuarios**
- **Listado de películas**
- **Crear nueva película**
- **Editar una película existente**
- **Ver detalles de una película**
- **Manejo de formularios con previsualización de imagen**
- **Alertas interactivas con SweetAlert2**
- **Validaciones básicas de formularios**

---

## 📄 Licencia

Este proyecto fue desarrollado con fines académicos para la materia _Programación Avanzada II_. Todos los derechos reservados.
