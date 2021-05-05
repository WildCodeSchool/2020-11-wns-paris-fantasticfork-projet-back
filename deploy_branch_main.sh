#!/bin/sh

git fetch origin && gco ew_deploy && git reset --hard origin/ew_deploy && git clean -f -d
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d