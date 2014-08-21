#!/bin/bash

cd $(dirname $0)/..
git pull origin master
pkill node
nohup node app.js >>log/app.log 2>&1 &
