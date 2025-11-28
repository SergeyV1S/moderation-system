require('dotenv/config');
const webPush = require('web-push');

const vapidKeys = {
  publicKey: process.env.VAPID_PUBLIC_KEY,
  privateKey: process.env.VAPID_PRIVATE_KEY
};

webPush.setVapidDetails(
  process.env.CLIENT_BASE_URL || 'mailto:sergeyyatsuk.19@mail.ru',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

class NotificationService {
  constructor() {
    this.subscriptions = new Map();
  }

  async sendAdApprovedNotification(userId, adData) {
    const payload = {
        title: 'Объявление одобрено!',
        body: `Ваше объявление "${adData.title}" было одобрено и теперь видно всем пользователям`,
        icon: '/icon512_rounded.png',
        badge: '/favicon.png',
        data: {
            url: `/ads/${adData.id}`,
            adId: adData.id,
            type: 'ad_approved'
        },
        vibrate: [200, 100, 200],
        requireInteraction: true
    };

    return await this.sendNotificationToAll(userId, payload);
    }

  async saveSubscription(userId, subscription) {
    this.subscriptions.set(userId, subscription);
    return true;
  }

  async removeSubscription(userId) {
    this.subscriptions.delete(userId);
    return true;
  }

  async sendNotificationToAll(payload) {
    const results = [];
    
    for (const [userId, subscription] of this.subscriptions) {
      try {
        await webPush.sendNotification(subscription, JSON.stringify(payload));
        results.push({ userId, status: 'success' });
      } catch (error) {
        console.error(`Ошибка отправки пользователю ${userId}:`, error);
        
        if (error.statusCode === 410) {
          await this.removeSubscription(userId);
        }
        results.push({ userId, status: 'error', error: error.message });
      }
    }
    
    return results;
  }

  async getSubscription(userId) {
    return this.subscriptions.get(userId);
  }
}

module.exports = new NotificationService();