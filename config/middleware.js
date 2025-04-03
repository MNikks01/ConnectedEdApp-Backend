import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from './config.js';
import { generalLimiter } from '../middleware/rateLimiter.middleware.js';

export const configureMiddleware = (app) => {
    // Rate limiting
    app.use(generalLimiter); // Apply rate limiter to all requests

    // Body parsing
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // CORS
    app.use(cors(config.cors));

    // Cookie parser
    app.use(cookieParser());

    // Security headers
    app.use((req, res, next) => {
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('X-XSS-Protection', '1; mode=block');
        next();
    });
}; 