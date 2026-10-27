# Stage 1: Build Frontend (Unchanged)
FROM node:22-alpine AS client-builder
WORKDIR /app/client
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# Stage 2: Production Server
FROM node:22-alpine AS runner
# Set the working directory to the server folder
WORKDIR /app/server

ENV NODE_ENV=production

# Copy backend dependencies from your server folder
COPY backend/package*.json ./
RUN npm ci --omit=dev

# Copy backend source code
COPY backend/ ./

# Copy compiled frontend from Stage 1 into the server folder
COPY --from=client-builder /app/client/build ./client/build

ENV PORT=5001
EXPOSE 5001

CMD ["node", "server.js"]