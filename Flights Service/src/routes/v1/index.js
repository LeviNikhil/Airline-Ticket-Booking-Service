const express = require('express');

const { InfoController } = require('../../controllers');

const router = express.Router();

console.log("Inside V1 Routes")

const airplaneRoutes=require('./airplane-routes');
const cityRoutes=require('./city-routes');

router.get('/info', InfoController.info);

router.use('/airplanes',airplaneRoutes);
router.use('/cities',cityRoutes);

module.exports = router;