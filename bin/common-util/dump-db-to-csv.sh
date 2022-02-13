#!/bin/bash
echo "Exporting csvs from local db dump..."
# I did this without a user, but you could also add a user using -U
psql -d common < ./bin/common-util/nyu-db-export.sql
echo "Moving csvs from /tmp to current directory..."
# nyu-db-export.sql writes to /tmp. Could figure out how to write to this dir directly
# but this was easier at the time
mkdir ./postgres/nyu-csv-data
mv /tmp/properties.csv ./postgres/nyu-csv-data/properties.csv
mv /tmp/spaces.csv ./postgres/nyu-csv-data/spaces.csv