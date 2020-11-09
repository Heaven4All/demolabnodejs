#!/bin/sh

chown -R node:node /home/node/app

npm install

node /home/node/app/server.js