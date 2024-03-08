'use strict'

import express from 'express'
import { validateJwt, isAdmin } from '../middlewares/validate-jwt.js'
import { test , saveE, getE, updateE, reportE, getA_Z, getZ_A, getTrayectory1_8, getTrayectory8_1 } from './empresa.controller.js'

const api = express.Router()

//ROLE ADMIN
api.get('/test', [validateJwt, isAdmin], test)
api.get('/get', [validateJwt, isAdmin], getE)
api.put('/update/:id', [validateJwt, isAdmin], updateE)
api.post('/save', [validateJwt, isAdmin], saveE)
api.get('/getAZ', [validateJwt, isAdmin], getA_Z)
api.get('/getZA', [validateJwt, isAdmin], getZ_A)
api.get('/getTrayectory', [validateJwt, isAdmin], getTrayectory8_1)
api.get('/getTrayectory18', [validateJwt, isAdmin], getTrayectory1_8)


//PUBLIC
api.get('/report', reportE)

export default api