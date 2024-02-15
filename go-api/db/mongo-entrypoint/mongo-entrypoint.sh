#!/bin/bash

echo "Executing MongoDB seed script..."
mongoimport --authenticationDatabase admin --host localhost -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD -d $MONGO_DB_NAME --collection images --type json --jsonArray --file /docker-entrypoint-initdb.d/init.json
echo "Mongo database $MONGO_DB_NAME seeded successfully!"

echo "Creating mongo users..."
mongosh --authenticationDatabase admin --host localhost -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD admin --eval "db.createUser({user: '$MONGO_USERNAME', pwd: '$MONGO_PASSWORD', roles: [{role: 'readWrite', db: '$MONGO_DB_NAME'}]});"
echo "Mongo users created successfully!"