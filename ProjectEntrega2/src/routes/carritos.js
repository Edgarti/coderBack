const express = require('express');
const Contenedor = require("../managers/contenedorCarrito");
import { CartsDaoSQL } from '../daos/carts/cartsSQL'; 

const router = express.Router();

// const carritoApi = new Contenedor("carrito.txt");

const carritoApi = CartsDaoSQL;

router.get('/',async(req,res)=>{
    const carrito = await carritoApi.getAll();
    res.send(carrito);
})

router.get('/:id',async(req,res)=>{
    const carritoId = req.params.id;
    const carrito = await carritoApi.getById(parseInt(productId));
    if(carrito){
        return res.send(carrito)
    } else{
        return res.send({error : 'producto no encontrado en el carrito'})
    }
})

router.post('/',async(req,res)=>{
    const newcarrito = req.body;
    const result = await carritoApi.save(newcarrito);
    res.send(result);
})

router.put('/:id',async(req,res)=>{
    const cambioObj = req.body;
    const carritoId = req.params.id;
    const result = await carritoApi.updateById(parseInt(carritoId),cambioObj);
    res.send(result);
})

router.delete('/:id',async(req,res)=>{
    const carritoId = req.params.id;
    const result = await carritoApi.deleteById(parseInt(carritoId));
    res.send(result);
})

module.exports = {carritoRouter:router};