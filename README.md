# 🧾 FinanzApp

**App CRUD web moderna para el control de gastos personales.**

Esta aplicación permite gestionar ingresos, gastos, categorías y visualizar estadísticas mediante una interfaz limpia y responsiva. Está desarrollada con **React 19**, **TypeScript**, **Vite**, **TailwindCSS** y una base de datos JSON simulada mediante `json-server`.

---

## 🚀 Tecnologías usadas

- ⚛️ React 19 + TypeScript
- 🧩 React Router DOM v7
- 🎨 TailwindCSS 4
- 📊 Recharts para gráficas
- 📦 json-server para simular una API REST (CRUD)
- 📁 Vite como bundler

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

### 3. Inicia el backend (json-server)

```bash
npx json-server --watch db.json --port 8000
```

> Asegúrate de tener un archivo `db.json` en la raíz del proyecto.  
> Puedes crear uno como ejemplo:

```json
{
  "operations": []
}
```

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

## 📁 Estructura del proyecto

```
finanzapp/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── utils/
│   └── main.tsx
├── db.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

---

## 🧑‍💻 Autor

- Kevin N.  
- GitHub: [@KNIKO20](https://github.com/KNIKO20)
