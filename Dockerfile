# Stage 1: Build the React application
# Use Node 22 LTS (alpine) — Vite 5 requires Node >= 20.19 or >= 22.12
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package manifests first to leverage Docker layer caching
COPY package.json package-lock.json* .npmrc* ./

# Use npm ci for clean, reproducible installs from the lockfile
# If no lockfile exists fall back to npm install
RUN npm install --prefer-offline --no-audit

# Copy the rest of the source and build
COPY . .
RUN npm run build

# Stage 2: Serve the built assets using lightweight Nginx
FROM nginx:stable-alpine

# Remove the default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy our custom config (port 8080 for Cloud Run)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Cloud Run requirement: listen on 8080
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
