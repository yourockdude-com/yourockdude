#!/bin/sh
#
ln -s ./frontend/app/*.jade ./views/.
cp -Rf ./frontend/public/ .
rm -f ./public/*.html

