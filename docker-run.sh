#!/bin/bash 

sudo docker run \
  --rm \
  --name=dvr163 \
  -v $(dirname "$(readlink -f "$0")")/config:/config \
  -p 8888:8888 \
  dvr163
