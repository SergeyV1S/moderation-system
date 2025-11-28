import { api } from "../utils";

class NotificationService {
  private publicVapidKey = process.env.VAPID_PUBLIC_KEY;

  async requestPermission(): Promise<NotificationPermission> {
    if (!("Notification" in window)) {
      throw new Error("Браузер не поддерживает уведомления");
    }

    if (Notification.permission === "granted") {
      return "granted";
    }

    return await Notification.requestPermission();
  }

  async subscribeToPush(): Promise<PushSubscription | null> {
    if (!("serviceWorker" in navigator)) {
      throw new Error("Service Worker не поддерживается");
    }

    const registration = await navigator.serviceWorker.ready;

    if (!this.publicVapidKey) {
      throw new Error("VAPID public key не настроен");
    }

    const convertedVapidKey = this.urlBase64ToUint8Array(this.publicVapidKey);

    try {
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey as unknown as ArrayBuffer
      });

      return subscription;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async sendSubscriptionToServer(subscription: PushSubscription): Promise<void> {
    try {
      await api.post("/notifications/subscribe", subscription);
    } catch (error) {
      console.error(error);
    }
  }

  async showLocalNotification(title: string, options?: NotificationOptions): Promise<void> {
    if (Notification.permission !== "granted") {
      await this.requestPermission();
    }

    if (Notification.permission === "granted") {
      const notification = new Notification(title, {
        icon: "/icon512_maskable.png",
        badge: "/icon512_rounded.png",
        ...options
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };
    }
  }

  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  isSupported(): boolean {
    return "Notification" in window && "serviceWorker" in navigator && "PushManager" in window;
  }

  async getCurrentSubscription(): Promise<PushSubscription | null> {
    const registration = await navigator.serviceWorker.ready;
    return await registration.pushManager.getSubscription();
  }

  async unsubscribeFromPush(): Promise<boolean> {
    const subscription = await this.getCurrentSubscription();
    if (subscription) {
      await subscription.unsubscribe();
      return true;
    }
    return false;
  }
}

export const notificationService = new NotificationService();
