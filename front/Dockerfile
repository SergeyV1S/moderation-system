FROM node:22.12.0-alpine AS builder

WORKDIR /var/www

ARG API_URL="${API_URL}"
ARG VAPID_PUBLIC_KEY="${VAPID_PUBLIC_KEY}"
ARG VAPID_PRIVATE_KEY="${VAPID_PRIVATE_KEY}"

COPY package.json ./
RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine AS production

COPY --from=builder /var/www/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

ENV API_URL="${API_URL}"
ENV VAPID_PUBLIC_KEY="${VAPID_PUBLIC_KEY}"
ENV VAPID_PRIVATE_KEY="${VAPID_PRIVATE_KEY}"

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]