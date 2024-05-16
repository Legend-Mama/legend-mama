#
#  See https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile for source!
#  ==============================================================================================

# Using node 20 as it is current LTS - default NextJS provided Dockerfile is 18
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
ENV NODE_ENV production
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app
COPY ./data ./data
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodegroup
RUN adduser --system --uid 1001 nodeuser

COPY --chown=nodeuser:nodegroup . .
USER nodeuser

EXPOSE 3000
ENV PORT 3000

CMD ["npm", "start"]