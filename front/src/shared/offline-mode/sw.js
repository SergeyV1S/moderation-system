import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from "workbox-strategies";

import { PATHS } from "../constants";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

registerRoute(
  ({ request }) => request.mode === "navigate",
  new NetworkFirst({
    cacheName: "html-cache",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200]
      })
    ]
  })
);

registerRoute(
  ({ request }) =>
    request.destination === "style" ||
    request.destination === "script" ||
    request.destination === "worker",
  new StaleWhileRevalidate({
    cacheName: "static-resources",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200]
      })
    ]
  })
);

registerRoute(
  ({ request }) =>
    request.destination === "image" || /\.(png|jpg|jpeg|gif|webp|svg|ico)$/i.test(request.url),
  new CacheFirst({
    cacheName: "images-cache",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200]
      }),
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60
      })
    ]
  })
);

registerRoute(
  ({ url }) => url.pathname.startsWith("/api/"),
  new NetworkFirst({
    cacheName: "api-cache",
    networkTimeoutSeconds: 3,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200]
      }),
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 5 * 60
      })
    ]
  })
);

self.addEventListener("push", (event) => {
  if (event.data) {
    try {
      const pushData = event.data.json();

      self.registration.showNotification(pushData.title, {
        body: pushData.body || "Новое сообщение",
        icon: pushData.icon || "/icon512_rounded.png",
        badge: pushData.badge || "/favicon.png",
        lang: "ru-Ru",
        image: pushData.image,
        tag: pushData.tag || "",
        data: pushData.data,
        requireInteraction: pushData.requireInteraction || false,
        silent: pushData.silent || false,
        vibrate: pushData.vibrate || [200, 100, 200],
        timestamp: Date.now()
      });
    } catch (error) {
      console.error(error);
    }
  }
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(PATHS.INDEX));
});
