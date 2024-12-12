import express from 'express'
import { initializeApp } from 'firebase-admin/app';
import { initializeApp as initializeFirebaseApp} from 'firebase/app'
import {routes} from './routes/index'
import { errorHandler } from './middlewares/error-handler.middleware';
import { pageNotFound } from './middlewares/page-not-found.middleware';
import { auth } from './middlewares/auth.middleware';
require('dotenv').config();

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

