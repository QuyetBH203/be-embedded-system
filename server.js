import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors'; // Thêm import cors

//authentication middleware
import {
    userRouter,
    studentRouter,
    iotDataRouter
} from './routes/index.js';
import checkToken from './authentication/auth.js';
dotenv.config();
import connect from './database/database.js';
import { connectMqtt } from './mqtt/index.js';

// Set MQTT constants if not in environment
if (!process.env.MQTT_HOST) {
    process.env.MQTT_HOST = "mqtt://broker.emqx.io";
}
if (!process.env.MQTT_PORT) {
    process.env.MQTT_PORT = 1883;
}
if (!process.env.MQTT_TOPIC_PREFIX) {
    process.env.MQTT_TOPIC_PREFIX = "group_13_iot";
}

const app = express();

// Thiết lập CORS cho tất cả các nguồn
app.use(cors({
    origin: '*', // Cho phép tất cả các nguồn gốc
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json()); //guard
// app.use(checkToken);
app.use('/users', userRouter);
app.use('/students', studentRouter);
app.use('/iot-data', iotDataRouter);

app.get('/', async(req,res)=>{
    res.send('Hello from Express.js, haha! 11 222');
});

app.listen(process.env.PORT || 8080, async(req,res)=>{
    await connect();
    console.log(`Server is running on port ${process.env.PORT || 8080}`);
    
    // Connect to MQTT broker
    console.log(`Connecting to MQTT broker at ${process.env.MQTT_HOST}:${process.env.MQTT_PORT}`);
    console.log(`Subscribing to topic prefix: ${process.env.MQTT_TOPIC_PREFIX}`);
    const mqttClient = connectMqtt();
});
