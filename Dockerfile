###################################################################################################
# TODO: 
# - use --only=production flag on npm ci to minimize what needs to be built
# - Only copy package-*.json files before running npm ci then copy the rest
###################################################################################################

# Use Node v10 base image
FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Copy source code to image
COPY . .

# Install dependencies
RUN npm ci
RUN cd client && npm ci

# Build the application
RUN npm run build

# Start the server
CMD [ "node", "dist/server.js" ]
