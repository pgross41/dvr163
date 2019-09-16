# Use Node v10 base image
FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Copy app dependencies only
# This takes advantage of cached Docker layers
COPY package*.json ./
RUN npm ci --only=production

# Install the rest of the source code
COPY . .

EXPOSE 8080
CMD [ "node", "server.js" ]
