//Configuracion de express

//Importaciones
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { config } from 'dotenv'
import userRoutes from '../src/user/user.routes.js'
import animalRoutes from '../src/animal/animal.routes.js'
import appointmentRoutes from '../src/appointment/appointment.routes.js'


//Configuraciones

const app = express() //Crear el servidor
config()
const port = process.env.PORT || 3200

// Configurar el servidor de express

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors()) //Aceptar o denegar las solicitudes de diferentes orígenes (local, remoto) / políticas de acceso
app.use(helmet())
app.use(morgan('dev')) //logs de solicitudes al servidor HTTP

//Declaración de rutas

app.use(userRoutes)
app.use('/animal',animalRoutes)
app.use('/appointment', appointmentRoutes)

//levantar el servidor
export const initServer  = ()=>{
    app.listen(port)
    console.log(`Server HTTP running in port ${port}`)
}

//console.log('Aquí vamos a configurar express')


/*

&&

V F = F
V V = V
F V = F
F F = F


||

V F = V
F V = V
V V = V
F F = F

*/