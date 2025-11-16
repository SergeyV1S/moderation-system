FROM node:22.12.0-alpine AS installer

WORKDIR /var/www

ARG CLIENT_BASE_URL="${CLIENT_BASE_URL}"
ARG PORT="${PORT}"

COPY . .
RUN npm install

FROM node:22.12.0-alpine AS production

COPY --from=installer /var/www/server.js ./
COPY --from=installer /var/www/node_modules ./node_modules
COPY --from=installer /var/www/src ./src

ENV CLIENT_BASE_URL="${CLIENT_BASE_URL}"
ENV PORT="${PORT}"

EXPOSE ${PORT}

CMD ["node", "server.js"]