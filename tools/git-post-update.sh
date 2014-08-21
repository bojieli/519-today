#!/bin/bash

cd $(dirname $0)
git pull origin master
pkill node
nohup ./app-runner.sh >/dev/null 2>&1 &
