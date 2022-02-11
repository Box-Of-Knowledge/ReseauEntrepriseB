FROM node:lts-alpine as build-stage
WORKDIR /app

COPY . .

RUN npm install && npm run build && npm cache clean --force

FROM caddy:2.4.5-alpine as caddy
WORKDIR /etc/caddy

COPY ./Caddyfile ./Caddyfile
COPY --from=build-stage /app/build /app

