import os
from typing import Optional, Dict, Any
import spotipy
from spotipy.oauth2 import SpotifyOAuth
from dotenv import load_dotenv

load_dotenv()

class SpotifyClient:
    def __init__(self):
        self.client_id = os.getenv("SPOTIFY_CLIENT_ID")
        self.client_secret = os.getenv("SPOTIFY_CLIENT_SECRET")
        self.redirect_uri = os.getenv("SPOTIFY_REDIRECT_URI", "http://localhost:5000/callback")
        
        self.sp_oauth = SpotifyOAuth(
            client_id=self.client_id,
            client_secret=self.client_secret,
            redirect_uri=self.redirect_uri,
            scope="user-top-read user-read-recently-played user-read-private user-read-email",
            cache_path=None
        )
    
    def get_auth_url(self) -> str:
        """Obtiene la URL de autorización de Spotify"""
        return self.sp_oauth.get_authorize_url()
    
    def get_access_token(self, code: str) -> Optional[Dict[str, Any]]:
        """Intercambia el código de autorización por un access token"""
        try:
            token_info = self.sp_oauth.get_access_token(code)
            return token_info
        except Exception as e:
            print(f"Error obteniendo token: {e}")
            return None
    
    def get_spotify_client(self, token: str) -> spotipy.Spotify:
        """Crea un cliente de Spotify con el token de acceso"""
        return spotipy.Spotify(auth=token)
    
    def get_user_profile(self, token: str) -> Optional[Dict[str, Any]]:
        """Obtiene el perfil del usuario"""
        try:
            sp = self.get_spotify_client(token)
            return sp.current_user()
        except Exception as e:
            print(f"Error obteniendo perfil: {e}")
            return None
    
    def get_top_tracks(self, token: str, time_range: str = "medium_term", limit: int = 20) -> Optional[Dict[str, Any]]:
        """
        Obtiene las canciones más escuchadas del usuario
        time_range: short_term (4 semanas), medium_term (6 meses), long_term (varios años)
        """
        try:
            sp = self.get_spotify_client(token)
            return sp.current_user_top_tracks(limit=limit, time_range=time_range)
        except Exception as e:
            print(f"Error obteniendo top tracks: {e}")
            return None
    
    def get_top_artists(self, token: str, time_range: str = "medium_term", limit: int = 20) -> Optional[Dict[str, Any]]:
        """Obtiene los artistas más escuchados del usuario"""
        try:
            sp = self.get_spotify_client(token)
            return sp.current_user_top_artists(limit=limit, time_range=time_range)
        except Exception as e:
            print(f"Error obteniendo top artists: {e}")
            return None
    
    def get_recently_played(self, token: str, limit: int = 50) -> Optional[Dict[str, Any]]:
        """Obtiene las canciones reproducidas recientemente"""
        try:
            sp = self.get_spotify_client(token)
            return sp.current_user_recently_played(limit=limit)
        except Exception as e:
            print(f"Error obteniendo canciones recientes: {e}")
            return None
