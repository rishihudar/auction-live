# Use Node.js 16 slim as the base image
FROM node:16-slim

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Vue.js app
RUN npm run build

# Expose port 8080 (or the port your Vue app listens on)
EXPOSE 8080

# Run the Vue.js app (using vue-cli-service)
CMD ["npm", "run", "serve"]
