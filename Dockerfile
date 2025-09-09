FROM node:20-alpine AS builder
WORKDIR /app

ENV NODE_ENV=development
COPY package.json package-lock.json ./
COPY apps/backend/package.json apps/backend/package.json
COPY apps/frontend/package.json apps/frontend/package.json
COPY packages/packages.ts packages/packages.ts
COPY packages/libs packages/libs
COPY packages/tsconfig.json packages/tsconfig.json
RUN npm ci

COPY . .

RUN npm run packages:build || true

RUN npm run build -w apps/backend && npm run build -w apps/frontend


FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY package.json package-lock.json ./

COPY --from=builder /app/apps/backend/dist ./apps/backend/dist
COPY --from=builder /app/apps/backend/package.json ./apps/backend/package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/frontend/dist ./apps/frontend/dist

RUN npm prune --omit=dev

ENV PORT=3000
EXPOSE 3000

CMD ["sh", "-c", "node apps/backend/dist/db/scripts/migrate.js && node apps/backend/dist/db/scripts/seed.js && node apps/backend/dist/index.js"]


