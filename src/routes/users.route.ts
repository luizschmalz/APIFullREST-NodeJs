import express from 'express'
import { UserController } from '../controllers/users.controller'
import asyncHandler from 'express-async-handler'
import { celebrate, Segments } from 'celebrate'
import { userSchema } from '../models/user.model'

export const userRoutes = express.Router()

userRoutes.get('/users', asyncHandler(UserController.getAll))
userRoutes.get('/users/:id', asyncHandler(UserController.getById))
userRoutes.post('/users', celebrate({[Segments.BODY]: userSchema}), asyncHandler(UserController.createUser))
userRoutes.delete('/users/:id', asyncHandler(UserController.deleteUser))
userRoutes.put('/users/:id', celebrate({[Segments.BODY]: userSchema}), asyncHandler(UserController.updateUser))
