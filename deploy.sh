#!/bin/sh

echo "Switching to branch master"
git checkout master

echo "Switch to client dir"
cd client/

echo "Building app"
npm run build

cp -r build/ ../build

echo "Switch back to root"
cd ../

echo "Deploying client files to server"
scp -r build/ server/ root@daex.nl:/var/www/ysp.dennisvdwaag.nl/

rm -rf build/

echo "Client deployment complete"