'use strict'

import Empresa from './empresa.model.js'
import { checkUpdate } from '../utils/validator.js'
import exceljs from 'exceljs'
const workbook = new exceljs.Workbook()  
const worksheet = workbook.addWorksheet('Empresa')

export const test = (req, res)=>{
    return res.send('Welcome Admin')
}

export const saveE = async(req, res)=>{
    try{
        let data = req.body
        let empresa = new Empresa(data)
        await empresa.save()
        return res.send({message: 'Empresa save successfull'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error saved Empresa', err})
    }
}

export const getE = async(req, res)=>{
    try{
        let empresas = await Empresa.find()
        return res.send({ empresas })
    }catch(err){
        console.error(err)
        return res.status(400).send({message: 'Error getting Empresas'})
    }
}

export const getZ_A = async(req, res)=>{
    try{
    let listaEmpresa = await Empresa.find().populate('category',['category']).sort({name:1})
    return res.send(listaEmpresa)
    }catch(err){
        console.error(err)
        return
    }
}

export const getA_Z = async(req, res)=>{
    try{
    let listaEmpresa = await Empresa.find().populate('category',['category']).sort({name:-1})
    return res.send(listaEmpresa)
    }catch(err){
        console.error(err)
        return
    }
}

export const getTrayectory8_1 = async(req, res)=>{
    try{
    let listaEmpresa = await Empresa.find().populate('category',['category']).sort({trajectoryyear:-1})
    return res.send(listaEmpresa)
    }catch(err){
        console.error(err)
        return
    }
}

export const getTrayectory1_8 = async(req, res)=>{
    try{
    let listaEmpresa = await Empresa.find().populate('category',['category']).sort({trajectoryyear:1})
    return res.send(listaEmpresa)
    }catch(err){
        console.error(err)
        return
    }
}

export const updateE = async(req, res)=>{
    try{
        let { id } = req.params
        let data = req.body
        let update = checkUpdate(data, false)
        if(!update) return res.status(400).send({message: 'Have sumbittied some data'})
        let updatedEmpresa = await Empresa.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        )
        if(!updatedEmpresa) return res.status(404).send({message: 'Empresa not found, not updated'})
        return res.send({message: 'Empresa updated successfull', updatedEmpresa})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error updating Empresa'})
    }
}

export const reportE = async(req, res)=>{
    try {
        const workbook = new exceljs.Workbook()
        const worksheet = workbook.addWorksheet('Empresas')
        worksheet.addRow(['Nombre', 'Impacto', 'Años de Trayectoria', 'Categoria'])
        const empresas = await Empresa.find()
           for (const empresa of empresas) {
            const { name, impactlevel, trajectoryyear, category } = empresa
            worksheet.addRow([name, impactlevel, trajectoryyear, category])
        }
        const filePath = 'empresas.xlsx'
        await workbook.xlsx.writeFile(filePath)

        res.status(200).send({message: 'Revisar la carpeta del proyecto excel generado',filePath})
    } catch (error) {
        console.error(error)
        res.status(500).send({message:'No se pudo agregar el Excel'})
    }
}