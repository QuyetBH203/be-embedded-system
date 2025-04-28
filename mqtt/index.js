import mqtt from 'mqtt';
import * as dotenv from 'dotenv';
import { print, OutputType } from '../helpers/print.js';
import { iotDataRepository } from '../repositories/index.js';

dotenv.config();

const MQTT_HOST = process.env.MQTT_HOST || "mqtt://broker.emqx.io";
const MQTT_PORT = process.env.MQTT_PORT || 1883;
const MQTT_TOPIC_PREFIX = process.env.MQTT_TOPIC_PREFIX || "group_13_iot";
const MQTT_TOPIC = `${MQTT_TOPIC_PREFIX}/#`;

// Connect to MQTT broker
const connectMqtt = () => {
    try {
        const client = mqtt.connect(MQTT_HOST, {
            port: MQTT_PORT,
            clientId: `nodejs_client_${Math.random().toString(16).slice(2, 8)}`,
            clean: true,
            connectTimeout: 4000,
            reconnectPeriod: 1000
        });

        client.on('connect', () => {
            print(`Connected to MQTT broker at ${MQTT_HOST}:${MQTT_PORT}`, OutputType.SUCCESS);
            
            // Subscribe to the topic
            client.subscribe(MQTT_TOPIC, (err) => {
                if (!err) {
                    print(`Subscribed to topic: ${MQTT_TOPIC}`, OutputType.SUCCESS);
                } else {
                    print(`Failed to subscribe to topic: ${err}`, OutputType.ERROR);
                }
            });
        });

        client.on('error', (error) => {
            print(`Connection error: ${error}`, OutputType.ERROR);
        });

        client.on('message', async (topic, message) => {
            print(`Received message from topic ${topic}:`, OutputType.INFORMATION);
            try {
                const jsonMessage = JSON.parse(message.toString());
                print('Data received:', OutputType.SUCCESS);
                console.log('Timestamp:', new Date().toLocaleString());
                console.log('Data:', JSON.stringify(jsonMessage, null, 2));
                
                // Save data to database
                try {
                    const savedData = await iotDataRepository.saveIotData(jsonMessage);
                    print(`Data saved to database with ID: ${savedData._id}`, OutputType.SUCCESS);
                } catch (dbError) {
                    print(`Failed to save data to database: ${dbError}`, OutputType.ERROR);
                }
                
                console.log('-----------------------------------');
            } catch (e) {
                print(`Raw message data: ${message.toString()}`, OutputType.INFORMATION);
                console.log('Timestamp:', new Date().toLocaleString());
                console.log('-----------------------------------');
            }
        });

        return client;
    } catch (error) {
        print(`Failed to connect to MQTT broker: ${error}`, OutputType.ERROR);
        return null;
    }
};

export { connectMqtt };