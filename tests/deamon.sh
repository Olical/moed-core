#!/bin/sh
./node_modules/.bin/nodemon --exec "./node_modules/.bin/tape" ./tests/*.js ./tests/**/*.js
