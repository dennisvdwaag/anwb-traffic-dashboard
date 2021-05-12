#!/bin/sh

echo "Switching to branch master"
git checkout master

echo "Deploying server files to server"
scp -r server/ .env root@daex.nl:/var/www/server.dennisvdwaag.nl/

echo "Move to client folder"
cd client/

echo "Building app"
npm run build

echo "Deploying client files to server"
scp -r build/ root@daex.nl:/var/www/ysp.dennisvdwaag.nl/

echo "Client deployment complete"