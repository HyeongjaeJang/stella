#!/bin/bash

# Exit on error
set -e

# Optional: Print commands as they run
set -x

# Step 1: Build Docker Compose images
echo "🐳 Building Docker images..."
docker-compose build

# Step 2: Start containers (detached)
echo "🚀 Starting containers..."
docker-compose up -d
