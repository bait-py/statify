# 🎧 Statify — Análisis musical desplegado con Docker

> Una aplicación moderna estilo *Spotify for Artists* que muestra tus estadísticas musicales en tiempo real.  
> Construido con **React**, **FastAPI**, y desplegado con **Docker Compose** 🐳  

---

## 🚀 Características principales

- 🔐 **Login con Spotify OAuth2**
- 🎵 Visualiza tus **top tracks**, **géneros** y **popularidad**
- 📊 Gráficos interactivos con **Recharts**
- 🗂️ API backend en **FastAPI**
- 🖥️ Interfaz moderna con **React + TailwindCSS**
- 🐳 **Deploy instantáneo con Docker Compose**

---

## 🧱 Arquitectura del proyecto

```

SpotiMetrics/
│
├── backend/              # API (FastAPI)
│   ├── app.py
│   ├── spotify_client.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/             # Dashboard (React)
│   ├── src/
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml    # Orquestación completa
└── README.md             # Este archivo 😎

````

---

## ⚙️ Instalación y uso

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/brunoalonso/spoti-metrics.git
   cd spoti-metrics
   ```

2. **Crea el archivo `.env`**

   ```env
   SPOTIFY_CLIENT_ID=tu_client_id
   SPOTIFY_CLIENT_SECRET=tu_client_secret
   SPOTIFY_REDIRECT_URI=http://localhost:5000/callback
   ```

3. **Levanta los contenedores**

   ```bash
   docker-compose up --build
   ```

4. **Abre tu navegador**

   ```
   http://localhost:3000
   ```

---

## 🧠 Tecnologías utilizadas

| Área             | Tecnología                     |
| ---------------- | ------------------------------ |
| Frontend         | React + TailwindCSS + Recharts |
| Backend          | FastAPI (Python)               |
| Auth             | OAuth2 Spotify API             |
| Contenedores     | Docker + Docker Compose        |
| CI/CD (opcional) | GitHub Actions                 |

---

## 📈 Ejemplo de estadísticas

| 🎵 Métrica            | 📊 Ejemplo                               |
| --------------------- | ---------------------------------------- |
| Oyentes mensuales     | 12,430                                   |
| Canción más escuchada | “Midnight Flow”                          |
| Popularidad           | 78 / 100                                 |
| Países top            | España 🇪🇸, México 🇲🇽, Argentina 🇦🇷 |

---

## 🧩 Futuras mejoras

* 🕒 Histórico diario (guardar métricas en MongoDB)
* 📄 Exportar reportes PDF automáticos
* 🔔 Alertas por cambios de popularidad
* 👥 Comparador de artistas

---

## 🐳 Docker Compose

```yaml
version: "3"
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    env_file:
      - .env

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
```

---

## 🖼️ Capturas de pantalla

> *(Agrega screenshots cuando lo tengas levantado)*
> ![Dashboard Preview](docs/preview.png)

---

## 💚 Créditos

Hecho con 💚 por **[Bruno Alonso](https://github.com/brunoalonso)**
Inspirado en la experiencia de **Spotify for Artists** y el mundo DevOps 🎧

---

## ⚡️ Licencia

Este proyecto se distribuye bajo la licencia **MIT**.

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
