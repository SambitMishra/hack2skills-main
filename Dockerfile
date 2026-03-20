# Stage 1: Build the React application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
# We use npm install since package-lock might be missing locally, or npm ci if present
COPY package.json package-lock.json* ./
RUN npm install

# Copy full source and build
COPY . .
RUN npm run build

# Stage 2: Serve the application using Nginx
FROM nginx:alpine

# Copy custom Nginx configuration for SPA routing and Cloud Run Port 8080
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built assets from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Cloud Run requires the container to listen on $PORT (defaults to 8080)
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
