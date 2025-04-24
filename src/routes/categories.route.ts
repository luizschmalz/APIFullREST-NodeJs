import express from 'express'
import { CategoriesController } from '../controllers/categories.controller.js'
import asyncHandler from 'express-async-handler'
import { celebrate, Segments } from 'celebrate'
import { newCategorySchema, updateCategorySchema } from '../models/categories.model.js'

export const categoryRoutes = express.Router()

categoryRoutes.get('/categories', asyncHandler(CategoriesController.getAll))
categoryRoutes.get('/categories/:id', asyncHandler(CategoriesController.getById))
categoryRoutes.post('/categories', celebrate({[Segments.BODY]: newCategorySchema}), asyncHandler(CategoriesController.createCategory))
categoryRoutes.put('/categories/:id', celebrate({[Segments.BODY]: updateCategorySchema}), asyncHandler(CategoriesController.updateCategory))
categoryRoutes.delete('/categories/:id', asyncHandler(CategoriesController.deleteCategory))
