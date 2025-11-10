#!/bin/bash

echo "🚀 Statify - Inicio del proyecto"
echo "================================="
echo ""

# Verificar si Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker no está instalado. Por favor, instala Docker primero."
    exit 1
fi

# Verificar Docker Compose (v2 usa 'docker compose', v1 usa 'docker-compose')
if ! docker compose version &> /dev/null && ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose no está instalado. Por favor, instala Docker Compose primero."
    exit 1
fi

# Determinar qué comando usar
if docker compose version &> /dev/null; then
    DOCKER_COMPOSE="docker compose"
else
    DOCKER_COMPOSE="docker-compose"
fi

# Verificar si existe el archivo .env
if [ ! -f .env ]; then
    echo "❌ No se encontró el archivo .env"
    echo "📝 Creando archivo .env de ejemplo..."
    cp .env.example .env
    echo "⚠️  Por favor, edita el archivo .env con tus credenciales de Spotify"
    exit 1
fi

# Verificar si las credenciales están configuradas
if grep -q "tu_client_id_aquí" .env; then
    echo "⚠️  Credenciales de Spotify no configuradas en .env"
    echo "📝 Por favor, edita el archivo .env con tus credenciales"
    exit 1
fi

echo "✅ Todo listo para iniciar"
echo ""
echo "🐳 Construyendo contenedores..."
$DOCKER_COMPOSE up --build

echo ""
echo "🎉 ¡Aplicación iniciada!"
echo "📱 Frontend: http://127.0.0.1:3000"
echo "🔧 Backend: http://127.0.0.1:5000"