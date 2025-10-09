# --- builder ---
FROM node:22-alpine AS builder
WORKDIR /app
corepack enable && corepack prepare pnpm@latest --activate
COPY package.json pnpm-lock.yaml* yarn.lock* package-lock.json* ./
RUN pnpm install --frozen-lockfile || pnpm ci || pnpm install
COPY . .
RUN pnpm run build

# --- runner ---
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app ./
EXPOSE 3000
CMD ["pnpm","run","start"]
