#!/usr/bin/env bash


export VERSION=1.0-SNAPSHOT

REGISTRY=local.registry.linkme8.cn:5000
PREFIX=turbo

BUILD_TIME=`date +%Y-%m-%d_%H`

docker login -u admin -p '******' $REGISTRY

docker tag turbo/turbo-bas-web:${VERSION} ${REGISTRY}/${PREFIX}/turbo-bas-web:${VERSION}
docker tag turbo/turbo-bas-web:${VERSION} ${REGISTRY}/${PREFIX}/turbo-bas-web:${VERSION}-${BUILD_TIME}

docker push ${REGISTRY}/${PREFIX}/turbo-bas-web:${VERSION}
docker push ${REGISTRY}/${PREFIX}/turbo-bas-web:${VERSION}-${BUILD_TIME}
