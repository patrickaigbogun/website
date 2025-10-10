# syntax=docker/dockerfile:1.7

ARG NODE_VERSION=22

############################################
# Base image with pnpm via Corepack
############################################
FROM node:${NODE_VERSION}-bookworm-slim AS base
ENV PNPM_HOME=/pnpm
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@10.13.1 --activate

############################################
# Dependencies (fetch/cache)
############################################
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
# Pre-fetch dependencies to leverage Docker cache
RUN pnpm fetch --prod

############################################
# Build stage
############################################
FROM base AS build
WORKDIR /app
# Restore fetched store for fast, hermetic install
COPY --from=deps /pnpm /pnpm
COPY --from=deps /root/.local/share/pnpm/store /root/.local/share/pnpm/store
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1
# Build Next.js and server TS
RUN pnpm run build

############################################
# Production dependencies only
############################################
FROM base AS prod-deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

############################################
# Runtime image
############################################
FROM node:${NODE_VERSION}-bookworm-slim AS runner
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

# Optional: install curl for container healthcheck
RUN apt-get update \
    && apt-get install -y --no-install-recommends curl \
    && rm -rf /var/lib/apt/lists/*

# Non-root user
RUN groupadd -g 1001 nodejs \
  && useradd -u 1001 -g nodejs -m nodeuser

# Bring in production deps and build outputs
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/dist ./dist
COPY --from=build /app/public ./public
COPY package.json ./package.json

EXPOSE 7990
# Use Fastify health endpoints if available
HEALTHCHECK --interval=30s --timeout=5s --retries=5 CMD curl -fsS http://localhost:7990/status || curl -fsS http://localhost:7990/ping || exit 1

USER nodeuser
CMD ["node", "dist/app.js"]
