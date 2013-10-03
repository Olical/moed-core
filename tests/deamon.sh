#!/bin/sh
./node_modules/.bin/nodemon --exec "./node_modules/.bin/tape" ./*.js ./**/*.js
