// utils/logger.js

import fs from 'fs';
import path from 'path';

// Function to log info
export const logInfo = (message) => {
    const logMessage = `[INFO] ${new Date().toISOString()} - ${message}`;
    fs.appendFileSync(path.join(__dirname, '..', 'logs', 'app.log'), logMessage + '\n');
};

// Function to log errors
export const logError = (error) => {
    const logMessage = `[ERROR] ${new Date().toISOString()} - ${error.message}`;
    fs.appendFileSync(path.join(__dirname, '..', 'logs', 'error.log'), logMessage + '\n');
};

// Function to log warnings
export const logWarning = (message) => {
    const logMessage = `[WARNING] ${new Date().toISOString()} - ${message}`;
    fs.appendFileSync(path.join(__dirname, '..', 'logs', 'warning.log'), logMessage + '\n');
};
