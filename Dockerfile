FROM node:14 as base

WORKDIR /app

# Install app dependencies
COPY package*.json ./

# Copy app files
COPY . .

FROM base as production
RUN npm ci --only=production

FROM base as dev
RUN npm install