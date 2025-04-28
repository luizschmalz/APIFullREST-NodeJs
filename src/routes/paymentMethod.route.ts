import express from 'express'
import { PaymentsController } from '../controllers/paymentMethod.controller.js'
import asyncHandler from 'express-async-handler'
import { celebrate, Segments } from 'celebrate'
import { newPaymentMethodSchema, updatePaymentMethodSchema } from '../models/paymentMethod.model.js'

export const paymentRoutes = express.Router()

paymentRoutes.get('/payment', asyncHandler(PaymentsController.getAll))
paymentRoutes.get('/payment/:id', asyncHandler(PaymentsController.getById))
paymentRoutes.post('/payment', celebrate({[Segments.BODY]: newPaymentMethodSchema}), asyncHandler(PaymentsController.createPayment))
paymentRoutes.put('/payment/:id', celebrate({[Segments.BODY]: updatePaymentMethodSchema}), asyncHandler(PaymentsController.updatePayment))
paymentRoutes.delete('/payment/:id', asyncHandler(PaymentsController.deletePayment))
