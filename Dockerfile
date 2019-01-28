FROM lsioarmhf/nginx-armhf:105

# Set the remote host to enable PHP debugging
# TODO: Make this work through the r pi onto a laptop
RUN apk add --no-cache bind-tools && \
    # echo "xdebug.remote_host=$(dig +short host.docker.internal)" >> /etc/php7/conf.d/php-local.ini
    # echo "xdebug.remote_host=$(dig +short host.docker.internal)" >> etc/php7/php.ini
    # echo "xdebug.remote_host=$(/sbin/ip route|awk '/default/ { print $3 }')" >> /etc/php7/conf.d/php-local.ini
    # echo "xdebug.remote_host=$(/sbin/ip route|awk '/default/ { print $3 }')" >> etc/php7/php.ini
    echo "xdebug.remote_host=192.168.65.1" >> etc/php7/php.ini

# Install npm 
RUN apk add --update nodejs nodejs-npm

# Install project dependencies 
# RUN cd /config/www && \
#     npm install --unsafe-perm
