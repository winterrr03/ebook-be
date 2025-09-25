#!/bin/bash
set -e

if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

echo "Waiting for database $DATABASE_HOST:$DATABASE_PORT ..."
while ! timeout 1 bash -c "echo > /dev/tcp/$DATABASE_HOST/$DATABASE_PORT" 2>/dev/null; do
  echo "Database is not ready yet..."
  sleep 2
done
echo "Database is ready!"

echo "Running migrations..."
npm run migration:run

echo "Starting backend..."
npm run start
