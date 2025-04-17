import express from 'express'
import { UserController } from '../controllers/users.controller.js'
import asyncHandler from 'express-async-handler'
import { celebrate, Segments } from 'celebrate'
import { newUserSchema, updateUserSchema } from '../models/user.model.js'

export const userRoutes = express.Router()

userRoutes.get('/users', asyncHandler(UserController.getAll))
userRoutes.get('/users/:id', asyncHandler(UserController.getById))
userRoutes.post('/users', celebrate({[Segments.BODY]: newUserSchema}), asyncHandler(UserController.createUser))
userRoutes.delete('/users/:id', asyncHandler(UserController.deleteUser))
userRoutes.put('/users/:id', celebrate({[Segments.BODY]: updateUserSchema}), asyncHandler(UserController.updateUser))
