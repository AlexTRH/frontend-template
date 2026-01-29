# Base stage: install dependencies
FROM node:20-slim AS base

# set working directory
WORKDIR /app

# copy package.json and yarn.lock
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# install dependencies
RUN \
  if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm install; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm install --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Builder stage: build the application
FROM base AS builder

# set working directory
WORKDIR /app

COPY --from=base /app/node_modules ./node_modules

# copy the source code
COPY . .

# build the application
RUN yarn build
# Runner stage: serve the built files using 'serve'
FROM node:20-slim AS runner

ADD . /app

# set working directory
WORKDIR /app

RUN npm install serve -g

# Устанавливаем только NODE_ENV, остальные переменные будут переданы через ConfigMap
ENV NODE_ENV=production

# Копируем собранные файлы
COPY --from=builder /app/dist ./dist

COPY --from=base /app/node_modules ./node_modules

EXPOSE 3000
ENV PORT 3000

# CMD: собираем env-переменные и выполняем замену их значений в сгенерированных файлах
CMD printenv | grep "VITE" > .env && yarn react-env --env $NODE_ENV -d dist --prefix VITE && serve -s dist -l 3000
