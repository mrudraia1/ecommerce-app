# Use official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the worker file and other code
COPY . .

# Command to run worker.js
CMD ["node", "worker.js"]
