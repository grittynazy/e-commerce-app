FROM node:18

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy app files
COPY . .

# Expose API port
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]

