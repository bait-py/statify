import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState('');
  const [artistQuery, setArtistQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [artistData, setArtistData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const accessToken = searchParams.get('access_token');
    if (accessToken) {
      setToken(accessToken);
    }
  }, [searchParams]);

  const searchArtist = async () => {
    if (!artistQuery.trim()) return;
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/artist/search`, {
        params: { token, q: artistQuery }
      });
      setSearchResults(response.data.artists);
    } catch (error) {
      console.error('Error searching:', error);
    }
    setLoading(false);
  };

  const selectArtist = async (artist) => {
    setSelectedArtist(artist);
    setArtistData(null);
    setLoading(true);
    
    try {
      // Cargar datos uno por uno para mejor manejo de errores
      console.log('Loading analytics for artist:', artist.id);
      const analytics = await axios.get(`${API_URL}/api/artist/${artist.id}/analytics`, { 
        params: { token },
        timeout: 10000
      });
      
      console.log('Loading top tracks...');
      const topTracks = await axios.get(`${API_URL}/api/artist/${artist.id}/top-tracks`, { 
        params: { token },
        timeout: 10000
      });
      
      console.log('Loading albums...');
      const albums = await axios.get(`${API_URL}/api/artist/${artist.id}/albums`, { 
        params: { token },
        timeout: 10000
      });
      
      console.log('Loading playlists...');
      const playlists = await axios.get(`${API_URL}/api/artist/${artist.id}/playlists`, { 
        params: { token },
        timeout: 10000
      });
      
      setArtistData({
        analytics: analytics.data,
        topTracks: topTracks.data.tracks,
        albums: albums.data.albums,
        playlists: playlists.data.playlists
      });
      
      console.log('Artist data loaded successfully');
    } catch (error) {
      console.error('Error loading artist data:', error);
      
      // Show specific error message
      let errorMessage = 'Error loading artist data.';
      
      if (error.code === 'ERR_BLOCKED_BY_CLIENT') {
        errorMessage = 'Error: Your browser or an extension (ad blocker) is blocking requests. Please:\n\n1. Disable ad blockers (uBlock, AdBlock, etc.)\n2. Disable privacy extensions\n3. Reload the page';
      } else if (error.response) {
        errorMessage = `Server error: ${error.response.data.detail || error.response.statusText}`;
      } else if (error.request) {
        errorMessage = 'Could not connect to server. Verify that the backend is running.';
      }
      
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const goBackToSearch = () => {
    setSelectedArtist(null);
    setArtistData(null);
    setSearchResults([]);
    setArtistQuery('');
  };

  return (
    <div className="min-h-screen text-white p-6 md:p-8" style={{ background: '#121212' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between animate-slideLeft">
          <div className="flex items-center gap-4">
            {/* Back Button - Only visible when artist is selected */}
            {selectedArtist && (
              <button
                onClick={goBackToSearch}
                className="bg-[#181818] hover:bg-[#282828] p-3 rounded-full border border-[#282828] hover:border-[#1DB954] transition-all transform hover:scale-110 group"
                title="Back to search"
              >
                <svg 
                  className="w-6 h-6 text-[#B3B3B3] group-hover:text-[#1DB954] transition-colors" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
            )}
            <div>
              <h1 className="text-4xl md:text-5xl font-black mb-2 bg-gradient-to-r from-white to-[#1DB954] bg-clip-text text-transparent" 
                  style={{ fontFamily: 'Poppins, sans-serif' }}>
                {selectedArtist ? selectedArtist.name : 'Artist Dashboard'}
              </h1>
              <p className="text-[#B3B3B3]">
                {selectedArtist ? 'Detailed artist statistics' : 'Discover insights about artists on Spotify'}
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3 bg-[#181818] px-4 py-2 rounded-full border border-[#282828]">
            <div className="w-2 h-2 bg-[#1DB954] rounded-full animate-pulse"></div>
            <span className="text-sm text-[#B3B3B3]">Connected</span>
          </div>
        </div>
        
        {/* Ad blocker warning - Only visible when NO artist is selected */}
        {!selectedArtist && (
          <div className="mb-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-2xl p-4 animate-fadeIn backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div className="flex-1">
                <h3 className="text-yellow-400 font-bold mb-1">Disable Ad Blockers</h3>
                <p className="text-sm text-[#B3B3B3]">
                  If you have trouble loading data, disable extensions like <strong>uBlock Origin</strong>, <strong>AdBlock</strong>, 
                  or <strong>Privacy Badger</strong> for this site. These extensions may block requests to the Spotify API.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Search Bar - Only visible when NO artist is selected */}
        {!selectedArtist && (
          <div className="mb-8 flex gap-3 animate-slideRight">
            <div className="flex-1 relative">
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#B3B3B3]" 
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={artistQuery}
                onChange={(e) => setArtistQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && searchArtist()}
                placeholder="Search for artist on Spotify..."
                className="w-full pl-12 pr-4 py-4 bg-[#181818] text-white rounded-2xl border border-[#282828] focus:border-[#1DB954] focus:outline-none focus:ring-2 focus:ring-[#1DB954]/20 transition-all placeholder-[#6a6a6a]"
              />
            </div>
            <button
              onClick={searchArtist}
              disabled={loading}
              className="bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold px-8 py-4 rounded-2xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-[0_0_30px_rgba(29,185,84,0.3)]"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        )}

        {/* Search Results */}
        {searchResults.length > 0 && !selectedArtist && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
            {searchResults.map((artist, idx) => (
              <div
                key={artist.id}
                onClick={() => selectArtist(artist)}
                className="bg-[#181818] p-4 rounded-2xl cursor-pointer border border-[#282828] card-hover group animate-scaleIn"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className="relative mb-3 overflow-hidden rounded-xl">
                  {artist.image && (
                    <img 
                      src={artist.image} 
                      alt={artist.name} 
                      className="w-full aspect-square object-cover transform group-hover:scale-110 transition-transform duration-500" 
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-2 right-2 bg-[#1DB954] p-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                    <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
                <h3 className="font-bold truncate text-white mb-1">{artist.name}</h3>
                <p className="text-sm text-[#B3B3B3] truncate">
                  {artist.followers.toLocaleString()} followers
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16 animate-fadeIn">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-[#282828] border-t-[#1DB954] rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-8 h-8 text-[#1DB954]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
              </div>
            </div>
            <p className="mt-4 text-[#B3B3B3] animate-pulse">Loading artist data...</p>
          </div>
        )}

        {/* Artist Data */}
        {artistData && (
          <div className="space-y-6">
            {/* Info box about popularity */}
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl p-4 animate-fadeIn">
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <h3 className="text-blue-400 font-bold mb-1">How does Popularity work on Spotify?</h3>
                  <p className="text-sm text-[#B3B3B3] mb-2">
                    Popularity is a value between <strong>0-100</strong> calculated by Spotify based on the total number 
                    of plays and how recent those plays are.
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full border border-green-500/30">
                      🔥 80-100: Very Popular
                    </span>
                    <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full border border-yellow-500/30">
                      ⭐ 60-79: Popular
                    </span>
                    <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full border border-orange-500/30">
                      📈 40-59: Growing
                    </span>
                    <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded-full border border-red-500/30">
                      🌱 0-39: Emerging
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Artist Header */}
            <div className="bg-gradient-to-br from-[#181818] to-[#282828] p-8 rounded-3xl border border-[#282828] animate-scaleIn shadow-2xl">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
                <div className="relative group">
                  <img
                    src={artistData.analytics.artist.image}
                    alt={artistData.analytics.artist.name}
                    className="w-40 h-40 rounded-full border-4 border-[#1DB954] shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 rounded-full bg-[#1DB954]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-4xl md:text-5xl font-black mb-4 text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {artistData.analytics.artist.name}
                  </h2>
                  <div className="grid grid-cols-2 gap-6 max-w-md">
                    <div className="bg-[#121212]/50 p-4 rounded-2xl border border-[#282828]">
                      <p className="text-[#B3B3B3] text-sm mb-1">Followers</p>
                      <p className="text-3xl font-bold text-[#1DB954]">
                        {artistData.analytics.artist.followers.toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-[#121212]/50 p-4 rounded-2xl border border-[#282828]">
                      <p className="text-[#B3B3B3] text-sm mb-2">Spotify Popularity</p>
                      <div className="flex items-baseline gap-2 mb-2">
                        <p className="text-3xl font-bold text-white">{artistData.analytics.artist.popularity}</p>
                        <p className="text-lg text-[#B3B3B3]">/100</p>
                      </div>
                      {/* Popularity bar */}
                      <div className="w-full bg-[#282828] rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ${
                            artistData.analytics.artist.popularity >= 80 ? 'bg-gradient-to-r from-green-500 to-green-400' :
                            artistData.analytics.artist.popularity >= 60 ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' :
                            artistData.analytics.artist.popularity >= 40 ? 'bg-gradient-to-r from-orange-500 to-orange-400' :
                            'bg-gradient-to-r from-red-500 to-red-400'
                          }`}
                          style={{ width: `${artistData.analytics.artist.popularity}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-[#6a6a6a] mt-1">
                        {artistData.analytics.artist.popularity >= 80 ? '🔥 Very Popular' :
                         artistData.analytics.artist.popularity >= 60 ? '⭐ Popular' :
                         artistData.analytics.artist.popularity >= 40 ? '📈 Growing' :
                         '🌱 Emerging'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Metrics Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-[#121212] p-5 rounded-2xl border border-[#282828] hover:border-[#1DB954] transition-all card-hover">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-2xl">💿</div>
                    <p className="text-[#B3B3B3] text-sm">Albums</p>
                  </div>
                  <p className="text-3xl font-bold text-white">{artistData.analytics.metrics.total_albums}</p>
                </div>
                <div className="bg-[#121212] p-5 rounded-2xl border border-[#282828] hover:border-[#1DB954] transition-all card-hover">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-2xl">🎵</div>
                    <p className="text-[#B3B3B3] text-sm">Singles</p>
                  </div>
                  <p className="text-3xl font-bold text-white">{artistData.analytics.metrics.total_singles}</p>
                </div>
                <div className="bg-[#121212] p-5 rounded-2xl border border-[#282828] hover:border-[#1DB954] transition-all card-hover">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-2xl">📀</div>
                    <p className="text-[#B3B3B3] text-sm">Releases</p>
                  </div>
                  <p className="text-3xl font-bold text-white">{artistData.analytics.metrics.total_releases}</p>
                </div>
                <div className="bg-[#121212] p-5 rounded-2xl border border-[#282828] hover:border-[#1DB954] transition-all card-hover">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-2xl">⭐</div>
                    <p className="text-[#B3B3B3] text-sm">Avg. Track Pop.</p>
                  </div>
                  <div className="flex items-baseline gap-1 mb-2">
                    <p className="text-3xl font-bold text-white">{artistData.analytics.metrics.avg_track_popularity}</p>
                    <p className="text-sm text-[#B3B3B3]">/100</p>
                  </div>
                  {/* Mini progress bar */}
                  <div className="w-full bg-[#282828] rounded-full h-1.5 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        artistData.analytics.metrics.avg_track_popularity >= 80 ? 'bg-green-500' :
                        artistData.analytics.metrics.avg_track_popularity >= 60 ? 'bg-yellow-500' :
                        artistData.analytics.metrics.avg_track_popularity >= 40 ? 'bg-orange-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${artistData.analytics.metrics.avg_track_popularity}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2">
                {artistData.analytics.artist.genres.slice(0, 6).map((genre, idx) => (
                  <span 
                    key={genre} 
                    className="bg-gradient-to-r from-[#1DB954]/20 to-[#1ed760]/20 border border-[#1DB954]/30 px-4 py-2 rounded-full text-sm text-[#1DB954] font-medium hover:from-[#1DB954]/30 hover:to-[#1ed760]/30 transition-all animate-fadeIn"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            {/* Top Tracks */}
            <div className="bg-[#181818] p-6 md:p-8 rounded-3xl border border-[#282828] animate-slideLeft">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-[#1DB954] to-[#1ed760] p-3 rounded-2xl">
                  <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Top Tracks
                  </h3>
                  <p className="text-sm text-[#B3B3B3]">Most popular songs</p>
                </div>
              </div>
              <div className="space-y-3">
                {artistData.topTracks.slice(0, 10).map((track, idx) => (
                  <div 
                    key={track.id} 
                    className="flex items-center gap-4 p-4 bg-[#282828] hover:bg-[#3e3e3e] rounded-2xl transition-all cursor-pointer group animate-fadeIn"
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    <span className="text-[#B3B3B3] w-6 font-bold group-hover:text-[#1DB954] transition-colors">
                      {idx + 1}
                    </span>
                    <div className="relative">
                      <img src={track.image} alt={track.name} className="w-14 h-14 rounded-xl shadow-lg" />
                      <div className="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-white truncate group-hover:text-[#1DB954] transition-colors">
                        {track.name}
                      </p>
                      <p className="text-sm text-[#B3B3B3] truncate">{track.album}</p>
                    </div>
                    <div className="text-right min-w-[140px]">
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <div className="flex items-center justify-end gap-1 mb-1">
                            <span className="text-xs font-bold text-white">{track.popularity}</span>
                            <span className="text-xs text-[#6a6a6a]">/100</span>
                          </div>
                          <div className="w-20 bg-[#121212] rounded-full h-2 overflow-hidden ml-auto">
                            <div 
                              className={`h-full rounded-full transition-all duration-500 ${
                                track.popularity >= 80 ? 'bg-gradient-to-r from-green-500 to-green-400' :
                                track.popularity >= 60 ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' :
                                track.popularity >= 40 ? 'bg-gradient-to-r from-orange-500 to-orange-400' :
                                'bg-gradient-to-r from-red-500 to-red-400'
                              }`}
                              style={{ width: `${track.popularity}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="text-xl">
                          {track.popularity >= 80 ? '🔥' :
                           track.popularity >= 60 ? '⭐' :
                           track.popularity >= 40 ? '📈' : '🌱'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Playlists */}
            <div className="bg-[#181818] p-6 md:p-8 rounded-3xl border border-[#282828] animate-slideRight">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-2xl">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Playlists
                  </h3>
                  <p className="text-sm text-[#B3B3B3]">{artistData.playlists.length} playlists found</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {artistData.playlists.slice(0, 8).map((playlist, idx) => (
                  <div 
                    key={playlist.id} 
                    className="bg-[#282828] p-4 rounded-2xl hover:bg-[#3e3e3e] transition-all cursor-pointer group animate-scaleIn"
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    <div className="relative mb-4 overflow-hidden rounded-xl shadow-lg">
                      {playlist.image ? (
                        <img 
                          src={playlist.image} 
                          alt={playlist.name} 
                          className="w-full aspect-square object-cover transform group-hover:scale-110 transition-transform duration-500" 
                        />
                      ) : (
                        <div className="w-full aspect-square bg-gradient-to-br from-[#1DB954] to-[#1ed760] flex items-center justify-center">
                          <svg className="w-12 h-12 text-black/50" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                          </svg>
                        </div>
                      )}
                      <div className="absolute bottom-2 right-2 bg-[#1DB954] p-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                        <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                    <p className="font-bold text-white text-sm mb-1 truncate">{playlist.name}</p>
                    <p className="text-xs text-[#B3B3B3]">{playlist.tracks_total} tracks</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
