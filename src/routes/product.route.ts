import express from 'express'
import { ProductsController } from '../controllers/products.controller.js'
import asyncHandler from 'express-async-handler'
import { celebrate, Segments } from 'celebrate'
import { newProductSchema, updateProductSchema, searchQuerySchema } from '../models/product.model.js'

export const productRoutes = express.Router()

productRoutes.get('/products', asyncHandler(ProductsController.getAll))
productRoutes.get('/products/search',celebrate({[Segments.QUERY]: searchQuerySchema}), asyncHandler(ProductsController.search))
productRoutes.get('/products/:id', asyncHandler(ProductsController.getById))
productRoutes.post('/products', celebrate({[Segments.BODY]: newProductSchema}), asyncHandler(ProductsController.createProduct))
productRoutes.put('/products/:id', celebrate({[Segments.BODY]: updateProductSchema}), asyncHandler(ProductsController.updateProduct))
productRoutes.delete('/products/:id', asyncHandler(ProductsController.deleteProduct))
