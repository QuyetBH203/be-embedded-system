import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import { iotDataRepository } from '../repositories/index.js';

async function getLatestIotData(req, res) {
    try {
        const { limit = 10 } = req.query;
        const data = await iotDataRepository.getLatestIotData(parseInt(limit));
        
        res.status(HttpStatusCode.OK).json({
            message: 'Get latest IoT data successfully',
            count: data.length,
            data: data
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.message
        });
    }
}

async function getLatestHeartAndSpo2(req, res) {
    try {
        const { limit = 10 } = req.query;
        const data = await iotDataRepository.getLatestHeartAndSpo2(parseInt(limit));
        
        res.status(HttpStatusCode.OK).json({
            message: 'Get latest heart rate and SpO2 data successfully',
            count: data.length,
            data: data
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.message
        });
    }
}

async function getLatestTemperature(req, res) {
    try {
        const { limit = 10 } = req.query;
        const data = await iotDataRepository.getLatestTemperature(parseInt(limit));
        
        res.status(HttpStatusCode.OK).json({
            message: 'Get latest temperature data successfully',
            count: data.length,
            data: data
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.message
        });
    }
}

async function getLatestAccelAndGyro(req, res) {
    try {
        const { limit = 10 } = req.query;
        const data = await iotDataRepository.getLatestAccelAndGyro(parseInt(limit));
        
        res.status(HttpStatusCode.OK).json({
            message: 'Get latest accelerometer and gyroscope data successfully',
            count: data.length,
            data: data
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.message
        });
    }
}

async function getLatestMotionCount(req, res) {
    try {
        const { limit = 10 } = req.query;
        const data = await iotDataRepository.getLatestMotionCount(parseInt(limit));
        
        res.status(HttpStatusCode.OK).json({
            message: 'Get latest motion count data successfully',
            count: data.length,
            data: data
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.message
        });
    }
}

async function getLatestVitalsAndTemperature(req, res) {
    try {
        const data = await iotDataRepository.getLatestVitalsAndTemperature();
        
        res.status(HttpStatusCode.OK).json({
            message: 'Get latest vitals (heart rate, SpO2) and temperature data successfully',
            data: data
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.message
        });
    }
}

export default {
    getLatestIotData,
    getLatestHeartAndSpo2,
    getLatestTemperature,
    getLatestAccelAndGyro,
    getLatestMotionCount,
    getLatestVitalsAndTemperature
};