# 🎤 Statify Artist Dashboard# 🎧 Statify — Análisis musical desplegado con Docker



Dashboard profesional para artistas de Spotify. Analiza tu música, descubre tu alcance y conecta con tu audiencia.> Una aplicación moderna estilo *Spotify for Artists* que muestra tus estadísticas musicales en tiempo real.  

> Construido con **React**, **FastAPI**, y desplegado con **Docker Compose** 🐳  

## ✨ Características

![GitHub](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)

### 📊 Métricas de Artista![Docker](https://img.shields.io/badge/docker-ready-blue?style=for-the-badge&logo=docker)

- Seguidores totales y popularidad (0-100)![React](https://img.shields.io/badge/react-18.3-61DAFB?style=for-the-badge&logo=react)

- Análisis de géneros musicales![FastAPI](https://img.shields.io/badge/fastapi-0.115-009688?style=for-the-badge&logo=fastapi)

- Discografía completa (álbumes, singles)

---

### 🎵 Análisis de Música

- Top Tracks con métricas de popularidad## 🚀 Características principales

- Análisis de álbumes y lanzamientos

- Audio Features detallados- 🔐 **Login con Spotify OAuth2**

- 🎵 Visualiza tus **top tracks**, **artistas** y **géneros**

### 🌐 Alcance- 📊 Gráficos interactivos con **Recharts**

- Playlists donde aparece tu música- 🗂️ API backend en **FastAPI**

- Artistas relacionados y networking- 🖥️ Interfaz moderna con **React + TailwindCSS + Vite**

- Presencia en el ecosistema Spotify- 🐳 **Deploy instantáneo con Docker Compose**

- ⚡ **Hot reload** en desarrollo

## 🚀 Inicio Rápido- 🎨 **Diseño responsivo** y moderno



1. **Configura Spotify API**---

   - Ve a https://developer.spotify.com/dashboard

   - Crea una app y obtén Client ID y Secret## 🧱 Arquitectura del proyecto

   - Agrega `http://127.0.0.1:5000/callback` como Redirect URI

```

2. **Configura el `.env`**Statify/

```bash│

SPOTIFY_CLIENT_ID=tu_client_id├── backend/              # API (FastAPI)

SPOTIFY_CLIENT_SECRET=tu_client_secret│   ├── app.py           # Endpoints principales

SPOTIFY_REDIRECT_URI=http://127.0.0.1:5000/callback│   ├── spotify_client.py # Cliente de Spotify API

```│   ├── requirements.txt

│   └── Dockerfile

3. **Inicia la app**│

```bash├── frontend/             # Dashboard (React + Vite)

./start.sh│   ├── src/

```│   │   ├── pages/       # Páginas (Home, Dashboard)

│   │   ├── services/    # API calls

4. **Accede**: http://127.0.0.1:3000│   │   ├── App.jsx

│   │   └── main.jsx

## 📡 API Endpoints│   ├── package.json

│   ├── vite.config.js

- `GET /api/artist/search` - Buscar artistas│   ├── tailwind.config.js

- `GET /api/artist/{id}/overview` - Info general│   └── Dockerfile

- `GET /api/artist/{id}/top-tracks` - Top canciones│

- `GET /api/artist/{id}/albums` - Discografía├── docker-compose.yml    # Orquestación completa

- `GET /api/artist/{id}/playlists` - Playlists├── .env                  # Variables de entorno

- `GET /api/artist/{id}/analytics` - Análisis completo└── README.md             # Este archivo 😎

```

## 🎨 Stack

---

**Backend**: FastAPI + Spotipy + Python 3.11  

**Frontend**: React 18 + Vite + TailwindCSS + Recharts  ## ⚙️ Instalación y uso

**DevOps**: Docker + Docker Compose

### 1️⃣ **Clona el repositorio**

## 📊 Datos Disponibles```bash

git clone https://github.com/bait-py/statify.git

✅ Seguidores, popularidad, top tracks, álbumes, playlists, audio features  cd statify

❌ Monthly listeners, streams exactos (requieren Spotify for Artists)   ```



---### 2️⃣ **Configura las credenciales de Spotify**



**Hecho con ❤️ para artistas**Necesitas crear una aplicación en [Spotify for Developers](https://developer.spotify.com/dashboard):


1. Ve a https://developer.spotify.com/dashboard
2. Crea una nueva app
3. Añade `http://localhost:5000/callback` como **Redirect URI**
4. Copia el **Client ID** y **Client Secret**

Luego, edita el archivo `.env`:

```env
SPOTIFY_CLIENT_ID=tu_client_id_aquí
SPOTIFY_CLIENT_SECRET=tu_client_secret_aquí
SPOTIFY_REDIRECT_URI=http://localhost:5000/callback
```

### 3️⃣ **Levanta los contenedores con Docker Compose**

```bash
docker-compose up --build
```

Esto levantará:
- **Backend (FastAPI)**: http://localhost:5000
- **Frontend (React + Vite)**: http://localhost:3000

### 4️⃣ **Abre tu navegador**

```
http://localhost:3000
```

¡Y listo! Haz clic en "Conectar con Spotify" y autoriza la aplicación. 🎉

---

## 🧠 Tecnologías utilizadas

| Área             | Tecnología                               |
| ---------------- | ---------------------------------------- |
| Frontend         | React 18 + Vite + TailwindCSS + Recharts |
| Backend          | FastAPI (Python 3.11)                    |
| API Client       | Spotipy (Spotify Web API wrapper)        |
| Auth             | OAuth2 Spotify API                       |
| HTTP Client      | Axios                                    |
| Contenedores     | Docker + Docker Compose                  |
| Routing          | React Router v6                          |
| Charts           | Recharts (Bar, Pie, Responsive)          |

---

## 📈 Endpoints de la API

| Método | Endpoint                    | Descripción                           |
| ------ | --------------------------- | ------------------------------------- |
| GET    | `/api/auth/login`           | Obtiene URL de autorización Spotify   |
| GET    | `/callback`                 | Callback OAuth2                       |
| GET    | `/api/user/profile`         | Perfil del usuario autenticado        |
| GET    | `/api/stats/top-tracks`     | Top canciones del usuario             |
| GET    | `/api/stats/top-artists`    | Top artistas del usuario              |
| GET    | `/api/stats/genres`         | Géneros más escuchados                |
| GET    | `/api/stats/recently-played`| Canciones reproducidas recientemente  |
| GET    | `/api/stats/dashboard`      | Todas las estadísticas para dashboard |

**Documentación interactiva:** http://localhost:5000/docs

---

## 🛠️ Desarrollo sin Docker

Si prefieres ejecutar los servicios sin Docker:

### Backend:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app:app --reload --port 5000
```

### Frontend:
```bash
cd frontend
npm install
npm run dev
```

---

## 🧩 Roadmap / Futuras mejoras

- [ ] 🕒 Histórico diario (guardar métricas en MongoDB/PostgreSQL)
- [ ] 📄 Exportar reportes PDF automáticos
- [ ] 🔔 Alertas por cambios de popularidad
- [ ] 👥 Comparador de artistas entre amigos
- [ ] 🎨 Temas personalizables (dark/light mode)
- [ ] 📱 PWA (Progressive Web App)
- [ ] 🌍 Internacionalización (i18n)
- [ ] 🔥 Integración con Last.fm
- [ ] 📊 Más tipos de gráficos (scatter, radar, etc.)

---

## 🖼️ Capturas de pantalla

### Landing Page
![Landing](https://via.placeholder.com/800x400/191414/1DB954?text=Home+Page)

### Dashboard
![Dashboard](https://via.placeholder.com/800x400/191414/1DB954?text=Dashboard+with+Charts)

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Si quieres mejorar el proyecto:

1. Haz un **fork** del repositorio
2. Crea una **rama** para tu feature: `git checkout -b feature/mi-feature`
3. **Commit** tus cambios: `git commit -m 'feat: añade nueva funcionalidad'`
4. **Push** a la rama: `git push origin feature/mi-feature`
5. Abre un **Pull Request**

---

## 🐛 Problemas conocidos

- El token de Spotify expira después de 1 hora (implementar refresh token próximamente)
- Los gráficos pueden tardar en cargar con muchos datos
- La app requiere permisos de Spotify para funcionar

---

## 💚 Créditos

Hecho con 💚 por **[Bruno Alonso](https://github.com/bait-py)**  
Inspirado en la experiencia de **Spotify for Artists** y el mundo DevOps 🎧

Tecnologías utilizadas:
- [Spotify Web API](https://developer.spotify.com/documentation/web-api)
- [FastAPI](https://fastapi.tiangolo.com/)
- [React](https://react.dev/)
- [Recharts](https://recharts.org/)
- [TailwindCSS](https://tailwindcss.com/)

---

## ⚡️ Licencia

Este proyecto se distribuye bajo la licencia **MIT**.

```
MIT License

Copyright (c) 2025 Bruno Alonso

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙋‍♂️ FAQ

**P: ¿Necesito tener Spotify Premium?**  
R: No, funciona con cuentas gratuitas de Spotify.

**P: ¿Los datos se guardan en algún lugar?**  
R: No, la app no guarda ningún dato. Todo se consulta en tiempo real desde la API de Spotify.

**P: ¿Por qué no veo datos?**  
R: Necesitas tener un historial de reproducción en Spotify. Si eres usuario nuevo, escucha música durante unos días.

**P: ¿Cómo obtengo las credenciales de Spotify?**  
R: Sigue las instrucciones en la sección de instalación para crear una app en el [Dashboard de Spotify](https://developer.spotify.com/dashboard).

---

¡Gracias por usar **Statify**! Si te gusta el proyecto, dale una ⭐ en GitHub 🚀

```

---

💥 **Extras que lo harían aún más guapo:**
- Badge de build:  
  ![Docker Build](https://img.shields.io/docker/cloud/build/brunoalonso/spoti-metrics?style=for-the-badge&logo=docker)
- Un logo SVG personalizado (puedo diseñarte uno rollo “SpotiMetrics – analytics for artists”)
- Un GIF corto del dashboard animado (para destacar el proyecto en el perfil)

---

¿Quieres que te deje ahora **la estructura del proyecto** (frontend/backend/docker-compose listos, con placeholders y el README incluido) para que empieces ya?  
Así te dejo todo montado pa’ que en 30-40 min lo tengas corriendo y bonito para GitHub 💿
```
