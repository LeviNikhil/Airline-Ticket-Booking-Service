const express = require('express');

const { InfoController } = require('../../controllers');

const router = express.Router();

console.log("Inside V1 Routes")

const airplaneRoutes=require('./airplane-routes');

router.get('/info', InfoController.info);

router.use('/airplanes',airplaneRoutes);

module.exports = router;