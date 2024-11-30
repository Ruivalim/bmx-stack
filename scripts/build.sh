#!/bin/bash

set -e

if [ ! -f .env ]; then
	echo "Please create a .env file"
	exit 1
fi

export $(cat .env | xargs)

export NODE_ENV=production

mkdir -p dist/src
bun scripts/generateStaticRoutes.ts
bun build --compile --minify --bytecode --sourcemap ./src/server.ts
mv server dist

cp -r src/views dist/src
cp -r public dist

find "public" -type f \( -name "*.css" -o -name "*.js" \) | while read -r FILE; do
  minify $FILE > dist/$FILE
done
