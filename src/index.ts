import express from 'express'
import { initializeApp } from 'firebase-admin/app';
import {routes} from './routes/index'
require('dotenv').config();

initializeApp()
const app = express()

routes(app)

app.listen(3000, () => {
    console.log('Server on port 3000')
})

