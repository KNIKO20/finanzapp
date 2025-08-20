# FinanzApp – Frontend 💰  

Interfaz web para la gestión de finanzas personales.  
Desarrollada en **React + TypeScript + TailwindCSS**, se conecta al backend para mostrar operaciones, balances y estadísticas de forma clara y moderna.  

---

## 🚀 Características  

- 📊 Visualización de operaciones (ingresos y gastos).  
- 🔐 Autenticación de usuarios con JWT.  
- 🍪 Manejo de sesión con cookies seguras.  
- 📱 Diseño responsive con TailwindCSS.  
- ⚡ Integración con backend real (Node/Express + PostgreSQL).  

---

## 🛠️ Tecnologías  

- [React](https://react.dev/)  
- [TypeScript](https://www.typescriptlang.org/)  
- [TailwindCSS](https://tailwindcss.com/)  
- [Vite](https://vitejs.dev/)  

---

## 📂 Estructura del proyecto  

```bash
finanzapp-frontend/
│── src/
│   ├── components/    # Componentes reutilizables
│   ├── pages/         # Páginas principales (Login, Dashboard, etc.)
│   ├── hooks/         # Custom hooks
│   ├── services/      # Conexión con el backend
│   └── App.tsx        # Configuración de rutas
│── public/
│── package.json
│── vite.config.ts
│── README.md

---

## 📦 Instalación y uso

### 1. Clona el repositorio

```bash
git clone https://github.com/KNIKO20/finanzapp.git
cd finanzapp
```

### 2. Instala las dependencias

```bash
npm install
```

### 3. Crear archivo .env

```.env
VITE_API_URL=http://localhost:8000
```
⚠️ Asegúrate de que el backend de FinanzApp esté corriendo en el puerto 8000.
El backend está en este repo: finanzapp-backend.

### 4. Inicia el frontend

En otra terminal:

```bash
npm run dev
```

---

## 🌐 Uso

Una vez iniciado:

- El frontend estará disponible en: `http://localhost:5173`
- El backend (API fake REST) en: `http://localhost:8000`

---

## 🧪 Scripts disponibles

```bash
npm run dev        # Inicia el servidor de desarrollo (Vite)
npm run build      # Genera el build de producción
npm run preview    # Previsualiza el build
npm run lint       # Linting del código
```

---

## 🛠 Requisitos

- Node.js v18+
- npm v9+
- Navegador moderno

---

## 🔐 Autenticación
Al iniciar sesión, el token JWT se guarda en una cookie segura.

Cada request al backend incluye automáticamente la cookie.

Si la sesión expira → redirige al login.

---

## 🧑‍💻 Autor

- Kevin N.  
- GitHub: [@KNIKO20](https://github.com/KNIKO20)
