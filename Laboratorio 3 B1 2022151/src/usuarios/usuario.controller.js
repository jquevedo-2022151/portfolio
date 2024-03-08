'use strict'

import Usuario from './usuario.model.js'
import { encrypt, checkPassword, checkUpdate } from '../utils/validator.js'
import { generateJwt } from '../utils/jwt.js'

export const test = (req, res)=>{
    return res.send('Welcome Admin')
}

export const register = async(req, res)=>{
    try{
    let data = req.body;
    data.password = await encrypt(data.password)
    data.role = 'ADMIN'
    let usuario = new Usuario(data)
    await usuario.save()
    return res.send({message: 'Registered successfully'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error registering usuario', err})
    }
}

export const login = async(req, res)=>{
    try{
        let { username, password } = req.body
        let usuario = await Usuario.findOne({ username })
        if(usuario && await checkPassword(password, usuario.password)){
            let loggedUsuario = {
                uid: usuario._id,
                username: usuario.username,
                name: usuario.name,
                role: usuario.role
            }
            let token = await generateJwt(loggedUsuario)
            return res.send(
                {
                    message: `Welcome ${usuario.name}`,
                    loggedUsuario,
                    token
                }
            )
        }
        return res.status(404).send({message: 'Invalid credentials'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Failed to login'})
    }
}

export const update = async(req, res)=>{
    try{
        let { id } = req.params
        let data = req.body
        let update = checkUpdate(data, id)
        if(!update) return res.status(400).send({message: 'Have sumbitted some data that cannot be updated or missing data'})
        let updatedUsuario = await Usuario.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        )
        if(!updatedUsuario) return res.status(401).send({message: 'Usuario not found and not updated'})
            return res.send({message: 'Updated usuario', updatedUsuario})
    }catch(err){
        console.error(err)
        if(err.keyValue.username) return res.status(400).send({message: `Username ${err.keyValue.username} is already taken`})
        return res.status(500).send({message: 'Error updating account'})
    }
}

export const deleteU = async(req, res)=>{
    try{
        let { id } = req.params
        let deletedUsuario = await Usuario.findOneAndDelete({_id: id})
        if(!deletedUsuario) return res.status(404).send({message: 'Account not found and not deleted'})
        return res.send({message: `Account with username ${deletedUsuario} deleted successfully`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error deleting account'})
    }
}