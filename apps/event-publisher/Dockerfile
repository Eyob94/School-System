FROM node:lts-alpine as install-dependencies

WORKDIR /app

COPY ./package.json .
COPY ./yarn.lock .

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn nx build event-publisher




FROM node:lts-alpine as serve

WORKDIR /app


COPY --from=install-dependencies /app/dist ./dist
COPY --from=install-dependencies /app/node_modules ./node_modules

CMD ["node", "dist/apps/event-publisher/server.js"]
