'use strict'

import express from 'express'
import { validateJwt, isAdmin } from '../middlewares/validate-jwt.js'
import { test, register , login, update, deleteU } from './usuario.controller.js'

const api = express.Router()


api.get('/test', [validateJwt, isAdmin], test)



api.put('/update/:id', update)
api.delete('/delete/:id', deleteU)


api.post('/register', register)
api.post('/login', login)

export default api