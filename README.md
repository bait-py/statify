# Statify — Análisis para artistas desplegado con Docker

Dashboard profesional para artistas de Spotify. Analiza tu música, descubre tu alcance y conecta con tu audiencia.

![GitHub](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)
![Docker](https://img.shields.io/badge/docker-ready-blue?style=for-the-badge&logo=docker)
![React](https://img.shields.io/badge/react-18.3-61DAFB?style=for-the-badge&logo=react)
![FastAPI](https://img.shields.io/badge/fastapi-0.115-009688?style=for-the-badge&logo=fastapi)

---

## 🚀 Características principales
### 🎵 Análisis de Música
- Top Tracks con métricas de popularidad
- Análisis de álbumes y lanzamientos
- Audio Features detallados - 🔐 **Login con Spotify OAuth2**
- Visualiza tus **top tracks**, **artistas** y **géneros**

### 🌐 Alcance
- Playlists donde aparece tu música
- Artistas relacionados y networking
- Presencia en el ecosistema Spotify

---

## 🚀 Inicio Rápido
1. **Configura Spotify API**
   - Ve a https://developer.spotify.com/dashboard

   - Crea una app y obtén Client ID y Secret## 🧱 Arquitectura del proyecto

   - Agrega `http://127.0.0.1:5000/callback` como Redirect URI

2. **Configura el `.env`**
```bash
SPOTIFY_CLIENT_ID=tu_client_id
SPOTIFY_CLIENT_SECRET=tu_client_secret
SPOTIFY_REDIRECT_URI=http://127.0.0.1:5000/callback
```

3. **Inicia la app**
```bash
./start.sh
```
4. **Accede**: http://127.0.0.1:3000

## 📡 API Endpoints

- `GET /api/artist/search` - Buscar artistas

- `GET /api/artist/{id}/overview` - Info general

- `GET /api/artist/{id}/top-tracks` - Top canciones

- `GET /api/artist/{id}/albums` - Discografía

- `GET /api/artist/{id}/playlists` - Playlists

- `GET /api/artist/{id}/analytics` - Análisis completo

## Capturas de pantalla
### Landing Page
![Landing](https://via.placeholder.com/800x400/191414/1DB954?text=Home+Page)
### Dashboard
![Dashboard](https://via.placeholder.com/800x400/191414/1DB954?text=Dashboard+with+Charts)

---

## Créditos
Hecho con 💚 por **[Bruno Alonso](https://github.com/bait-py)**  
Inspirado en la experiencia de **Spotify for Artists** y el mundo DevOps

## Licencia
Este proyecto se distribuye bajo la licencia **MIT**.
