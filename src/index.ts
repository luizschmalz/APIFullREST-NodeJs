import express from 'express'
import { initializeApp } from 'firebase-admin/app';
import {routes} from './routes/index'
import { errorHandler } from './middlewares/error-handler.middleware';
import { pageNotFound } from './middlewares/page-not-found.middleware';
require('dotenv').config();

initializeApp();
const app = express();

routes(app);
pageNotFound(app);
errorHandler(app);

app.listen(3000, () => {
    console.log('Server on port 3000');
})

