'use strict'

//rutas del usuario

import express from 'express'
import { validateJwt, isAdmin } from '../middlewares/validate-jwt.js'
import { test, register , login, update, deleteU } from './user.controller.js'

const api = express.Router()

//MidLeware
//ROLE ADMIN
api.get('/test', [validateJwt, isAdmin], test) //<- Solo si está logeado

//ROLE CLIENT/ADMIN

api.put('/update/:id', update)
api.delete('/delete/:id', deleteU)

//PUBLIC
api.post('/register', register)
api.post('/login', login) //JWT

export default api

//export default api //<- importar con otro nombre Ejemplo: userRoutes

//export const api <- tiene que si o si llevar el nombre que está en ese archivo