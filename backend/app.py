"""
Statify Artist Dashboard API - Backend para análisis de artistas en Spotify
"""
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, RedirectResponse
from typing import Optional, Dict, Any, List
from pydantic import BaseModel
from spotify_client import SpotifyClient
from collections import Counter

app = FastAPI(
    title="Statify Artist Dashboard API",
    description="API profesional para análisis de artistas en Spotify",
    version="2.0.0"
)

# Configuración de CORS - Más permisivo para desarrollo
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todos los orígenes en desarrollo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

# Cliente de Spotify
spotify_client = SpotifyClient()

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "service": "Statify Artist Dashboard API",
        "status": "running",
        "version": "2.0.0",
        "message": "Backend listo para análisis de artistas 🎤🎵"
    }

@app.get("/api/auth/login")
async def login():
    """Redirige al usuario a la página de autorización de Spotify"""
    auth_url = spotify_client.get_auth_url()
    return {"auth_url": auth_url}

@app.get("/callback")
async def callback(code: Optional[str] = None, error: Optional[str] = None):
    """Callback de Spotify OAuth"""
    if error:
        raise HTTPException(status_code=400, detail=f"Error de autenticación: {error}")
    
    if not code:
        raise HTTPException(status_code=400, detail="No se recibió código de autorización")
    
    token_info = spotify_client.get_access_token(code)
    
    if not token_info:
        raise HTTPException(status_code=401, detail="No se pudo obtener el token de acceso")
    
    frontend_url = f"http://127.0.0.1:3000/dashboard?access_token={token_info['access_token']}"
    return RedirectResponse(url=frontend_url)

@app.get("/api/artist/search")
async def search_artist(
    token: str = Query(..., description="Spotify access token"),
    q: str = Query(..., description="Nombre del artista a buscar"),
    limit: int = Query(10, ge=1, le=50)
):
    """Busca artistas por nombre"""
    sp = spotify_client.get_spotify_client(token)
    
    if not sp:
        raise HTTPException(status_code=401, detail="Token inválido")
    
    try:
        results = sp.search(q=q, type='artist', limit=limit)
        artists = []
        
        for item in results['artists']['items']:
            artists.append({
                "id": item["id"],
                "name": item["name"],
                "followers": item["followers"]["total"],
                "popularity": item["popularity"],
                "genres": item.get("genres", []),
                "image": item["images"][0]["url"] if item["images"] else None
            })
        
        return {"artists": artists, "total": len(artists)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error en búsqueda: {str(e)}")

@app.get("/api/artist/{artist_id}/overview")
async def get_artist_overview(
    artist_id: str,
    token: str = Query(..., description="Spotify access token")
):
    """Obtiene información general del artista"""
    sp = spotify_client.get_spotify_client(token)
    
    if not sp:
        raise HTTPException(status_code=401, detail="Token inválido")
    
    try:
        artist = sp.artist(artist_id)
        
        return {
            "id": artist["id"],
            "name": artist["name"],
            "followers": artist["followers"]["total"],
            "popularity": artist["popularity"],
            "genres": artist.get("genres", []),
            "images": artist.get("images", []),
            "external_urls": artist.get("external_urls", {})
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error obteniendo artista: {str(e)}")

@app.get("/api/artist/{artist_id}/top-tracks")
async def get_artist_top_tracks(
    artist_id: str,
    token: str = Query(..., description="Spotify access token"),
    market: str = Query("US", description="Código de país ISO 3166-1 alpha-2")
):
    """Obtiene los top tracks del artista"""
    sp = spotify_client.get_spotify_client(token)
    
    if not sp:
        raise HTTPException(status_code=401, detail="Token inválido")
    
    try:
        top_tracks = sp.artist_top_tracks(artist_id, country=market)
        
        tracks = []
        for track in top_tracks['tracks']:
            tracks.append({
                "id": track["id"],
                "name": track["name"],
                "album": track["album"]["name"],
                "popularity": track["popularity"],
                "duration_ms": track["duration_ms"],
                "preview_url": track.get("preview_url"),
                "image": track["album"]["images"][0]["url"] if track["album"]["images"] else None,
                "release_date": track["album"].get("release_date"),
                "external_urls": track.get("external_urls", {})
            })
        
        return {"tracks": tracks, "total": len(tracks)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error obteniendo top tracks: {str(e)}")

@app.get("/api/artist/{artist_id}/albums")
async def get_artist_albums(
    artist_id: str,
    token: str = Query(..., description="Spotify access token"),
    limit: int = Query(20, ge=1, le=50),
    include_groups: str = Query("album,single", description="album, single, appears_on, compilation")
):
    """Obtiene los álbumes del artista"""
    sp = spotify_client.get_spotify_client(token)
    
    if not sp:
        raise HTTPException(status_code=401, detail="Token inválido")
    
    try:
        albums_data = sp.artist_albums(artist_id, album_type=include_groups, limit=limit)
        
        albums = []
        for album in albums_data['items']:
            albums.append({
                "id": album["id"],
                "name": album["name"],
                "type": album["album_type"],
                "release_date": album.get("release_date"),
                "total_tracks": album.get("total_tracks"),
                "image": album["images"][0]["url"] if album["images"] else None,
                "external_urls": album.get("external_urls", {})
            })
        
        return {"albums": albums, "total": len(albums), "next": albums_data.get("next")}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error obteniendo álbumes: {str(e)}")

@app.get("/api/artist/{artist_id}/related-artists")
async def get_related_artists(
    artist_id: str,
    token: str = Query(..., description="Spotify access token")
):
    """Obtiene artistas relacionados"""
    sp = spotify_client.get_spotify_client(token)
    
    if not sp:
        raise HTTPException(status_code=401, detail="Token inválido")
    
    try:
        related = sp.artist_related_artists(artist_id)
        
        artists = []
        for artist in related.get('artists', []):
            try:
                artists.append({
                    "id": artist["id"],
                    "name": artist["name"],
                    "followers": artist.get("followers", {}).get("total", 0),
                    "popularity": artist.get("popularity", 0),
                    "genres": artist.get("genres", []),
                    "image": artist["images"][0]["url"] if artist.get("images") else None
                })
            except Exception as item_error:
                print(f"Error processing artist item: {item_error}")
                continue
        
        return {"artists": artists, "total": len(artists)}
    except Exception as e:
        import traceback
        error_detail = f"Error obteniendo artistas relacionados: {str(e)}\nTraceback: {traceback.format_exc()}"
        print(error_detail)
        raise HTTPException(status_code=500, detail=f"Error obteniendo artistas relacionados: {str(e)}")

@app.get("/api/artist/{artist_id}/playlists")
async def search_artist_in_playlists(
    artist_id: str,
    token: str = Query(..., description="Spotify access token"),
    limit: int = Query(20, ge=1, le=50)
):
    """Busca playlists que contengan canciones del artista"""
    sp = spotify_client.get_spotify_client(token)
    
    if not sp:
        raise HTTPException(status_code=401, detail="Token inválido")
    
    try:
        artist = sp.artist(artist_id)
        artist_name = artist["name"]
        results = sp.search(q=artist_name, type='playlist', limit=limit)
        
        playlists = []
        for item in results['playlists']['items']:
            if item:
                playlists.append({
                    "id": item["id"],
                    "name": item["name"],
                    "owner": item["owner"]["display_name"],
                    "tracks_total": item["tracks"]["total"],
                    "image": item["images"][0]["url"] if item.get("images") else None,
                    "external_urls": item.get("external_urls", {}),
                    "description": item.get("description", "")
                })
        
        return {"playlists": playlists, "total": len(playlists), "artist_name": artist_name}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error buscando playlists: {str(e)}")

@app.get("/api/artist/{artist_id}/analytics")
async def get_artist_analytics(
    artist_id: str,
    token: str = Query(..., description="Spotify access token")
):
    """Obtiene análisis completo del artista"""
    sp = spotify_client.get_spotify_client(token)
    
    if not sp:
        raise HTTPException(status_code=401, detail="Token inválido")
    
    try:
        # Obtener datos básicos del artista
        artist = sp.artist(artist_id)
        top_tracks = sp.artist_top_tracks(artist_id)
        albums = sp.artist_albums(artist_id, limit=50)
        
        # Intentar obtener artistas relacionados con manejo de errores
        related = {"artists": []}
        try:
            related = sp.artist_related_artists(artist_id)
        except Exception as e:
            print(f"Warning: Could not fetch related artists: {str(e)}")
        
        total_albums = len([a for a in albums['items'] if a['album_type'] == 'album'])
        total_singles = len([a for a in albums['items'] if a['album_type'] == 'single'])
        avg_track_popularity = sum(t['popularity'] for t in top_tracks['tracks']) / len(top_tracks['tracks']) if top_tracks['tracks'] else 0
        
        all_genres = []
        for rel_artist in related['artists'][:10]:
            all_genres.extend(rel_artist.get('genres', []))
        genre_counts = Counter(all_genres)
        
        return {
            "artist": {
                "id": artist["id"],
                "name": artist["name"],
                "followers": artist["followers"]["total"],
                "popularity": artist["popularity"],
                "genres": artist.get("genres", []),
                "image": artist["images"][0]["url"] if artist["images"] else None
            },
            "metrics": {
                "total_albums": total_albums,
                "total_singles": total_singles,
                "total_releases": len(albums['items']),
                "avg_track_popularity": round(avg_track_popularity, 1),
                "related_artists_count": len(related['artists'])
            },
            "top_tracks_preview": [
                {"name": t["name"], "popularity": t["popularity"], "album": t["album"]["name"]}
                for t in top_tracks['tracks'][:5]
            ],
            "genre_analysis": [
                {"genre": genre, "count": count}
                for genre, count in genre_counts.most_common(10)
            ],
            "related_artists_preview": [
                {"name": a["name"], "followers": a["followers"]["total"], "popularity": a["popularity"]}
                for a in related.get('artists', [])[:5]
            ]
        }
    except Exception as e:
        import traceback
        error_detail = f"Error en análisis: {str(e)}\nTraceback: {traceback.format_exc()}"
        print(error_detail)  # Log para debugging
        raise HTTPException(status_code=500, detail=f"Error en análisis: {str(e)}")

@app.get("/health")
async def health_check():
    """Verifica el estado del servicio"""
    return {"status": "healthy", "service": "Statify Artist Dashboard API", "version": "2.0.0"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)
