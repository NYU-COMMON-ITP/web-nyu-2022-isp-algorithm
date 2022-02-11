#!/bin/bash
# Example of how to run an initialization shell script
# If creating new scripts you'll need to make them executable using chmod +x script-name.sh
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER nyu;
    ALTER ROLE username WITH PASSWORD 'password';
    CREATE DATABASE nyu;
    GRANT ALL PRIVILEGES ON DATABASE nyu TO nyu;
EOSQL