const express = require('express');
const router = express.Router();
const notificationService = require('../../controllers/v1/notification');

router.post('/subscribe', async (req, res) => {
  try {
    const { subscription } = req.body;
    
    if (!subscription) {
      return res.status(400).json({
        error: 'Подписка обязательна'
      });
    }

    const userId = req.user?.id || `user_${Date.now()}`;
    
    await notificationService.saveSubscription(userId, subscription);
    
    res.json({
      success: true,
      message: 'Подписка успешно сохранена'
    });
  } catch (error) {
    console.error('Ошибка подписки:', error);
    res.status(500).json({
      error: 'Ошибка при сохранении подписки'
    });
  }
});

router.post('/unsubscribe', async (req, res) => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(400).json({
        error: 'ID пользователя обязателен'
      });
    }

    await notificationService.removeSubscription(userId);
    
    res.json({
      success: true,
      message: 'Отписка выполнена успешно'
    });
  } catch (error) {
    console.error('Ошибка отписки:', error);
    res.status(500).json({
      error: 'Ошибка при отписке'
    });
  }
});

router.post('/test', async (req, res) => {
  try {
    const { userId } = req.body;
    
    const payload = {
      title: 'Тестовое уведомление',
      body: 'Это тестовое уведомление с сервера!',
      icon: '/icon512_rounded.png',
      badge: '/favicon.png',
      data: {
        url: '/',
        timestamp: new Date().toISOString()
      }
    };

    await notificationService.sendNotificationToAll(payload);

    res.json({
      success: true,
      message: 'Тестовое уведомление отправлено'
    });
  } catch (error) {
    console.error('Ошибка отправки тестового уведомления:', error);
    res.status(500).json({
      error: 'Ошибка при отправке уведомления'
    });
  }
});

// Получение статуса подписки
router.get('/status', async (req, res) => {
  try {
    // В реальном приложении здесь нужно получить userId из авторизации
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(400).json({
        error: 'ID пользователя обязателен'
      });
    }

    const subscription = await notificationService.getSubscription(userId);
    
    res.json({
      subscribed: !!subscription,
      subscription: subscription || null
    });
  } catch (error) {
    console.error('Ошибка получения статуса:', error);
    res.status(500).json({
      error: 'Ошибка при получении статуса подписки'
    });
  }
});

module.exports = router;