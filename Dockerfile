# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if they exist)
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the entire project (code, assets, etc.) into the container
COPY . .

# Expose the port that the app will run on (default port for Vite is 8080)
EXPOSE 8080

# Run the application using npm run serve with --host to expose it on all network interfaces
CMD ["npm", "run", "serve", "--", "--host", "0.0.0.0"]
