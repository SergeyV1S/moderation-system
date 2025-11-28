const express = require('express');
const router = express.Router();

const adsRoutes = require('./ads');
const statsRoutes = require('./stats');
const moderatorsRoutes = require('./moderators');
const notificationsRoutes = require('./notifications');

router.use('/ads', adsRoutes);
router.use('/stats', statsRoutes);
router.use('/moderators', moderatorsRoutes);
router.use('/notifications', notificationsRoutes);

module.exports = router;
