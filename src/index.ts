import express from 'express'
import { initializeApp } from 'firebase-admin/app';
import { initializeApp as initializeFirebaseApp} from 'firebase/app'
import {routes} from './routes/index.js'
import { errorHandler } from './middlewares/error-handler.middleware.js';
import { pageNotFound } from './middlewares/page-not-found.middleware.js';
import { auth } from './middlewares/auth.middleware.js';
import dotenv from 'dotenv';
dotenv.config();

initializeApp();
initializeFirebaseApp({
    apiKey: process.env.API_KEY
})
const app = express();

auth(app);
routes(app);
pageNotFound(app);
errorHandler(app);

app.listen(3000, () => {
    console.log('Server on port 3000');
})

