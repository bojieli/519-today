#!/bin/bash

cd $(dirname $0)/..
while true; do
	echo -n "===== TIME " >>log/app.log
	date >>log/app.log
	echo "Starting app..." >>log/app.log
	node app.js >>log/app.log 2>&1
	sleep 2
done
