import express from 'express';
import { iotDataController } from '../controllers/index.js';

const router = express.Router();

// Get latest IoT data
router.get('/latest', iotDataController.getLatestIotData);

// Get latest heart rate and SpO2 data only
router.get('/vitals', iotDataController.getLatestHeartAndSpo2);

// Get latest temperature data only
router.get('/temperature', iotDataController.getLatestTemperature);

// Get latest accelerometer and gyroscope data only
router.get('/motion', iotDataController.getLatestAccelAndGyro);

// Get latest motion count data only
router.get('/motion-count', iotDataController.getLatestMotionCount);

// Get latest vitals (heart rate, SpO2) and temperature data
router.get('/vitals-temperature', iotDataController.getLatestVitalsAndTemperature);

export default router;