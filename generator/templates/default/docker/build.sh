#!/usr/bin/env bash
rm -rf ./static
mkdir static
cp -r ../dist/* ./static/
export VERSION_STR=`date "+%Y-%m-%d"`.${BUILD_NUMBER}
echo ${VERSION_STR}>./static/version.txt
docker build -t turbo/turbo-bas-web:1.0-SNAPSHOT .


