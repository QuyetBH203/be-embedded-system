import mongoose, { Schema, ObjectId } from "mongoose";

const IotData = mongoose.model('IotData',
    new mongoose.Schema({
        id: { type: ObjectId },
        heart: { 
            type: Number, 
            required: true 
        },
        spo2: { 
            type: Number, 
            required: true 
        },
        temp: { 
            type: Number, 
            required: true 
        },
        accel_x: { 
            type: Number, 
            required: true 
        },
        accel_y: { 
            type: Number, 
            required: true 
        },
        accel_z: { 
            type: Number, 
            required: true 
        },
        gyro_x: { 
            type: Number, 
            required: true 
        },
        gyro_y: { 
            type: Number, 
            required: true 
        },
        gyro_z: { 
            type: Number, 
            required: true 
        },
        motion_count: { 
            type: Number, 
            required: true 
        },
        timestamp: { 
            type: Date, 
            default: Date.now 
        }
    })
);

export default IotData;