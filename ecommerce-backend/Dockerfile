# Use node image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy files
COPY package.json ./
COPY package-lock.json ./
RUN npm install --force

COPY . .

# Expose port
EXPOSE 5000

# Start server
CMD ["npm", "start"]