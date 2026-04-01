# Stage 1: Dependencies
FROM node:22-slim AS deps
WORKDIR /app
# Install pnpm manually to avoid dependency on host environment
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Stage 2: Build
FROM node:22-slim AS build
WORKDIR /app
RUN npm install -g pnpm
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm run build
# Remove devDependencies to keep the image small
RUN pnpm prune --prod

# Stage 3: Production
FROM node:22-slim AS prod
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY package.json ./

EXPOSE $PORT
CMD [ "node", "dist/main" ]
