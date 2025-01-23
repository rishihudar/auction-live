# Use a Node.js base image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if they exist)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app is running on (default for Vite is 5173)
EXPOSE 5173

# Define the start command (use npm run serve for Vite)
CMD ["npm", "run", "serve"]
