import { IotData } from '../models/index.js';
import { print, OutputType } from '../helpers/print.js';
import Exception from '../exceptions/Exception.js';

const saveIotData = async (iotData) => {
    try {
        const newIotData = await IotData.create(iotData);
        return newIotData;
    } catch (error) {
        print(`Error saving IoT data: ${error}`, OutputType.ERROR);
        throw new Exception('Unable to save IoT data');
    }
};

const getLatestIotData = async (limit = 10) => {
    try {
        const data = await IotData.find()
            .sort({ timestamp: -1 })
            .limit(limit);
        return data;
    } catch (error) {
        print(`Error retrieving IoT data: ${error}`, OutputType.ERROR);
        throw new Exception('Unable to retrieve IoT data');
    }
};

const getLatestHeartAndSpo2 = async (limit = 10) => {
    try {
        const data = await IotData.find({}, { 
            heart: 1, 
            spo2: 1, 
            timestamp: 1, 
            _id: 1 
        })
            .sort({ timestamp: -1 })
            .limit(limit);
        return data;
    } catch (error) {
        print(`Error retrieving heart and SpO2 data: ${error}`, OutputType.ERROR);
        throw new Exception('Unable to retrieve heart and SpO2 data');
    }
};

const getLatestTemperature = async (limit = 10) => {
    try {
        const data = await IotData.find({}, { 
            temp: 1, 
            timestamp: 1, 
            _id: 1 
        })
            .sort({ timestamp: -1 })
            .limit(limit);
        return data;
    } catch (error) {
        print(`Error retrieving temperature data: ${error}`, OutputType.ERROR);
        throw new Exception('Unable to retrieve temperature data');
    }
};

const getLatestAccelAndGyro = async (limit = 10) => {
    try {
        const data = await IotData.find({}, { 
            accel_x: 1, 
            accel_y: 1, 
            accel_z: 1, 
            gyro_x: 1, 
            gyro_y: 1, 
            gyro_z: 1, 
            timestamp: 1, 
            _id: 1 
        })
            .sort({ timestamp: -1 })
            .limit(limit);
        return data;
    } catch (error) {
        print(`Error retrieving accelerometer and gyroscope data: ${error}`, OutputType.ERROR);
        throw new Exception('Unable to retrieve accelerometer and gyroscope data');
    }
};

const getLatestMotionCount = async (limit = 10) => {
    try {
        const data = await IotData.find({}, { 
            motion_count: 1, 
            timestamp: 1, 
            _id: 1 
        })
            .sort({ timestamp: -1 })
            .limit(limit);
        return data;
    } catch (error) {
        print(`Error retrieving motion count data: ${error}`, OutputType.ERROR);
        throw new Exception('Unable to retrieve motion count data');
    }
};

const getLatestVitalsAndTemperature = async () => {
    try {
        const data = await IotData.findOne({}, { 
            heart: 1, 
            spo2: 1, 
            temp: 1, 
            timestamp: 1, 
            _id: 1 
        })
            .sort({ timestamp: -1 });
        return data;
    } catch (error) {
        print(`Error retrieving vitals and temperature data: ${error}`, OutputType.ERROR);
        throw new Exception('Unable to retrieve vitals and temperature data');
    }
};

export default {
    saveIotData,
    getLatestIotData,
    getLatestHeartAndSpo2,
    getLatestTemperature,
    getLatestAccelAndGyro,
    getLatestMotionCount,
    getLatestVitalsAndTemperature
};