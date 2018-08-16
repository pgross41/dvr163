# Base PHP/nginx image
# http://dockerfile.readthedocs.io/en/latest/content/DockerImages/dockerfiles/php-nginx.html 
FROM webdevops/php-nginx:7.2

# Add local files
COPY root/ /

# Set the remote host to enable PHP debugging
RUN echo "xdebug.remote_host=$(dig +short host.docker.internal)" >> /opt/docker/etc/php/php.ini

# Install npm 
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - && \
    apt-get install -y nodejs

# Install project dependencies 
RUN cd /var/www  && \
    npm install
