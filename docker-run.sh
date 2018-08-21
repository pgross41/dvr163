sudo docker run \
  --rm \
  --name=dvr163 \
  -v $(pwd)/config:/config \
  -p 8888:8888 \
  dvr163
