#!/bin/bash

echo "Statify - Starting application"
echo "================================="
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "ERROR: Docker is not installed."
    exit 1
fi

# Check Docker Compose (v2 uses 'docker compose', v1 uses 'docker-compose')
if ! docker compose version &> /dev/null && ! command -v docker-compose &> /dev/null; then
    echo "ERROR: Docker Compose is not installed."
    exit 1
fi

# Determine which command to use
if docker compose version &> /dev/null; then
    DOCKER_COMPOSE="docker compose"
else
    DOCKER_COMPOSE="docker-compose"
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo "ERROR: .env file not found"
    echo "Creating .env from template..."
    cp .env.example .env
    echo "WARNING: Configure your Spotify credentials in .env before running"
    exit 1
fi

# Check if credentials are configured
if grep -q "tu_client_id_aquí" .env; then
    echo "WARNING: Spotify credentials not configured in .env"
    echo "Edit .env file with your credentials before proceeding"
    exit 1
fi

echo "Starting containers..."
$DOCKER_COMPOSE up --build

echo ""
echo "Application running:"
echo "Frontend: http://127.0.0.1:3000"
echo "Backend: http://127.0.0.1:5000"