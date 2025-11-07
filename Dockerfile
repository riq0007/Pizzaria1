# Etapa 1: build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=optional
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# Etapa 2: runtime
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --only=production --omit=optional
COPY --from=builder /app/dist ./dist
COPY public ./public

CMD ["node", "dist/src/server.js"]


