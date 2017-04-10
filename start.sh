#!/bin/sh

node /home/app/api-server/api.js &
cd /home/app/symbolizer && npm start