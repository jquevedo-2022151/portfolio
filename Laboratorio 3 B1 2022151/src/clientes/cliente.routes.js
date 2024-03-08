'use strict'

import express from 'express'
import { validateJwt, isAdmin } from '../middlewares/validate-jwt.js'
import { deleteC, saveC, updateC, test } from './cliente.controller.js'

const api = express.Router()


api.get('/test', [validateJwt, isAdmin], test)

api.put('/update/:id',[validateJwt, isAdmin], updateC)
api.delete('/delete/:id',[validateJwt, isAdmin], deleteC)

api.post('/save', [validateJwt, isAdmin],saveC)

export default api