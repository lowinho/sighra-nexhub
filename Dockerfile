# ─────────────────────────────────────────
# Stage 1: build
# ─────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci                  # instala tudo incluindo devDependencies

COPY tsconfig.json ./
COPY src ./src
RUN npm run build           # tsc && tsc-alias → resolve os @aliases

# ─────────────────────────────────────────
# Stage 2: produção (imagem enxuta)
# ─────────────────────────────────────────
FROM node:20-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=builder /app/dist ./dist

RUN addgroup -g 1001 -S nodejs && \
    adduser  -S nodeapp -u 1001
USER nodeapp

EXPOSE 3333

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3333/ || exit 1

CMD ["node", "dist/index.js"]