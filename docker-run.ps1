docker stop dvr163
docker run `
  -d `
  --rm `
  --name=dvr163 `
  -v "$($pwd.path)\root\var\www:/var/www" `
  -v "$($pwd.path)\root\opt\docker\etc\nginx\vhost.conf:/opt/docker/etc/nginx/vhost.conf" `
  -e PHP_DISPLAY_ERRORS=1 `
  -p 8888:8888 `
  dvr163

