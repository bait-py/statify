import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleConnect = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/auth/login`);
      window.location.href = response.data.auth_url;
    } catch (error) {
      console.error('Error:', error);
      alert('Error al conectar con Spotify');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: '#121212' }}>
      {/* Background gradient effect */}
      <div className="absolute inset-0 gradient-animated opacity-40" 
           style={{ 
             background: 'linear-gradient(135deg, #1DB954 0%, #121212 30%, #1ed760 60%, #121212 100%)'
           }}>
      </div>
      
      {/* Floating circles decoration */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#1DB954] rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#1ed760] rounded-full opacity-10 blur-3xl"></div>
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl w-full text-center space-y-8">
          {/* Logo/Brand */}
          <div className={`${mounted ? 'animate-scaleIn' : 'opacity-0'}`}>
            <div className="inline-flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-[#1DB954] to-[#1ed760] rounded-full flex items-center justify-center pulse-glow">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
              </div>
            </div>
            <h1 className="text-7xl font-black mb-4 bg-gradient-to-r from-white via-[#1ed760] to-white bg-clip-text text-transparent" 
                style={{ fontFamily: 'Poppins, sans-serif' }}>
              Statify
            </h1>
            <div className="h-1 w-32 mx-auto mb-6 bg-gradient-to-r from-transparent via-[#1DB954] to-transparent"></div>
          </div>
          
          {/* Description */}
          <div className={`${mounted ? 'animate-fadeIn' : 'opacity-0'} space-y-4`} style={{ animationDelay: '0.2s' }}>
            <p className="text-3xl font-semibold text-white">
              Dashboard Profesional para Artistas
            </p>
            <p className="text-lg text-[#B3B3B3] max-w-2xl mx-auto">
              Analiza tu presencia en Spotify, descubre insights sobre tus oyentes, 
              tracks más populares y playlists donde apareces.
            </p>
          </div>
          
          {/* Features */}
          <div className={`${mounted ? 'animate-fadeIn' : 'opacity-0'} grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto my-12`} 
               style={{ animationDelay: '0.4s' }}>
            <div className="bg-[#181818] p-6 rounded-2xl border border-[#282828] card-hover">
              <div className="text-4xl mb-3">📊</div>
              <h3 className="text-lg font-bold text-white mb-2">Analytics en Tiempo Real</h3>
              <p className="text-sm text-[#B3B3B3]">Métricas actualizadas de seguidores y popularidad</p>
            </div>
            <div className="bg-[#181818] p-6 rounded-2xl border border-[#282828] card-hover">
              <div className="text-4xl mb-3">🎵</div>
              <h3 className="text-lg font-bold text-white mb-2">Top Tracks</h3>
              <p className="text-sm text-[#B3B3B3]">Descubre tus canciones más escuchadas</p>
            </div>
            <div className="bg-[#181818] p-6 rounded-2xl border border-[#282828] card-hover">
              <div className="text-4xl mb-3">📱</div>
              <h3 className="text-lg font-bold text-white mb-2">Playlists</h3>
              <p className="text-sm text-[#B3B3B3]">Ve dónde aparece tu música</p>
            </div>
          </div>
          
          {/* CTA Button */}
          <div className={`${mounted ? 'animate-scaleIn' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
            <button
              onClick={handleConnect}
              disabled={loading}
              className="group relative bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold py-5 px-16 rounded-full text-xl shadow-2xl hover:shadow-[0_0_40px_rgba(29,185,84,0.5)] transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {loading ? (
                <span className="flex items-center gap-3">
                  <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Conectando...
                </span>
              ) : (
                <span className="flex items-center gap-3 justify-center">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                  Conectar con Spotify
                </span>
              )}
            </button>
            <p className="mt-4 text-sm text-[#6a6a6a]">
              Necesitas una cuenta de Spotify para continuar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
