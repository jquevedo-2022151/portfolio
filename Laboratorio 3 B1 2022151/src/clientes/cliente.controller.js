'use strict'

import Cliente from './cliente.model.js'
import { encrypt, checkUpdate } from '../utils/validator.js'

export const test = (req, res)=>{
    return res.send('Welcome Admin')
}

export const saveC = async(req, res)=>{
    try{
    let data = req.body;
    data.password = await encrypt(data.password)
    data.role = 'CLIENT'
    let cliente = new Cliente(data)
    await cliente.save()
    return res.send({message: 'saved successfully'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error saving cliente', err})
    }
}

export const updateC = async(req, res)=>{
    try{
        let { id } = req.params
        let data = req.body
        let update = checkUpdate(data, id)
        if(!update) return res.status(400).send({message: 'Have sumbitted some data that cannot be updated or missing data'})
        let updatedCliente = await Cliente.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        )
        if(!updatedCliente) return res.status(401).send({message: 'Cliente not found and not updated'})
            return res.send({message: 'Updated cliente', updatedCliente})
    }catch(err){
        console.error(err)
        if(err.keyValue.username) return res.status(400).send({message: `Username ${err.keyValue.username} is already taken`})
        return res.status(500).send({message: 'Error updating account'})
    }
}

export const deleteC = async(req, res)=>{
    try{
        let { id } = req.params
        let deletedCliente = await Cliente.findOneAndDelete({_id: id})
        if(!deletedCliente) return res.status(404).send({message: 'Account not found and not deleted'})
        return res.send({message: `Account with username ${deletedCliente} deleted successfully`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error deleting account'})
    }
}