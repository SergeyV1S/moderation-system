FROM node:22.12.0-alpine AS installer

WORKDIR /var/www

ARG CLIENT_BASE_URL="${CLIENT_BASE_URL}"
ARG PORT="${PORT}"
ARG VAPID_PUBLIC_KEY="${VAPID_PUBLIC_KEY}"
ARG VAPID_PRIVATE_KEY="${VAPID_PRIVATE_KEY}"

COPY . .
RUN npm install

FROM node:22.12.0-alpine AS production

COPY --from=installer /var/www/server.js ./
COPY --from=installer /var/www/node_modules ./node_modules
COPY --from=installer /var/www/src ./src

ENV CLIENT_BASE_URL="${CLIENT_BASE_URL}"
ENV PORT="${PORT}"
ENV VAPID_PUBLIC_KEY="${VAPID_PUBLIC_KEY}"
ENV VAPID_PRIVATE_KEY="${VAPID_PRIVATE_KEY}"

EXPOSE ${PORT}

CMD ["node", "server.js"]