import express from 'express'
import asyncHandler from 'express-async-handler'
import { celebrate, Segments } from 'celebrate'
import { OrderController } from '../controllers/order.controller.js'
import { changeStatusSchema, newOrderSchema, orderParamSchema } from '../models/order.model.js'

export const orderRoutes = express.Router()

orderRoutes.post('/orders', celebrate({[Segments.BODY]: newOrderSchema}), asyncHandler(OrderController.createOrder))
orderRoutes.get('/orders', celebrate({[Segments.BODY]: orderParamSchema}), asyncHandler(OrderController.getAllOrders))
orderRoutes.get('/orders/:id/items', asyncHandler(OrderController.getItems))
orderRoutes.get('/orders/:id', asyncHandler(OrderController.getById))
orderRoutes.post('/orders/:id/status',celebrate({[Segments.BODY]: changeStatusSchema}), asyncHandler(OrderController.changeStatus))

