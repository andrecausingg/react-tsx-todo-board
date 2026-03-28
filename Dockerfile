FROM node:22

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the project files
COPY . .

# Expose dev server port
EXPOSE 5173

# Start Vite dev server
CMD ["npm", "run", "dev"]