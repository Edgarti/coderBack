const express = require('express');
const { Router} = require("express")
const fs = require("fs");
const path = require("path");
const Contenedor = require("./contenedorProductos");
const ContenedorCar = require("./contenedorCarrito");
const {Server} = require("socket.io");
const { captureRejectionSymbol } = require('events');

const dotenv = require('dotenv');       
const { AsyncResource } = require('async_hooks');
dotenv.config();
// const PORT = process.env.PORT
const PORT = 8080

const productsService = new Contenedor("productos.txt");
const carritoService = new ContenedorCar("carrito.txt");
const viewsFolder = path.join(__dirname,"views")

const app = express();
const server = app.listen(8080,()=>console.log(`server listening on port ${PORT}`));

app.use(express.static(__dirname+"/public"));

//middlewares para interpretar la info que llega en formato json a traves de una solicitud
app.use(express.json());
app.use(express.urlencoded({extended:true}));

let administrador = true;

const routerProductos = express.Router()
const routerCarrito = express.Router() 

routerProductos.get("/",async(req,res)=>{
    const productos = await productsService.getAll();
    console.log(productos)
    res.json({
        productos
    })
})

//**********************  Productos ****************/

routerProductos.post("/",async(req,res)=>{
    let prod = req.body;
    const productos = await productsService.getAll();
    let id = productos.length+1
    prod.id = id;
    console.log(req.body)
    productos.push(prod);
    console.log(productos);
    fs.writeFileSync("./files/productos.txt",JSON.stringify(productos, null,2));
    res.json({
        msg : 'Se agrego la producto',
        Id : id
       })
   })

   routerProductos.get("/:id",async(req,res)=>{
    let indice = req.params.id;
    const productos = await productsService.getAll();
    let prodFilter = productos.filter(p => p.id ==indice)

    if((prodFilter == undefined) || prodFilter.length == 0 ){
        res.json({
         error: 'Producto no encontrado'
        })
       }else{
        res.json({prodFilter})
       }
   })

   routerProductos.delete("/:id",async(req,res)=>{
    let indice = req.params.id ;
    const productos = await productsService.getAll();
    let prodFilter = productos.filter(p => p.id !=indice)
    if((prodFilter == undefined) || prodFilter.length == 0 ){
        res.json({
         error: 'Producto no encontrado'
        })
       }else{
        fs.writeFileSync("./files/productos.txt",JSON.stringify(prodFilter , null,2));
        res.json({prodFilter})
       }
   })

 routerProductos.put("/",async(req,res)=>{
    if(!req.body.nombre || !req.body.descripcion || !req.body.codigo
        || !req.body.id || !req.body.precio|| !req.body.stock  ) {
        res.json({
         error: true,
         codigo: 502,
         mensaje: 'El campo nombre, descripcion, codigo, id,precio, stock son requeridos'
        });
       } else {
            if(req.body.nombre=== '' || req.body.descripcion  === '' || req.body.codigo=== ''
            || req.body.id=== '' || req.body.precio=== '') {
                res.json({
                    error: true,
                    codigo: 501,
                    mensaje: 'Hay campos vacios'
            });
            } else {
                let num = parseInt(req.body.id) - 1
                const productos = await productsService.getAll();
                productos[num].nombre = req.body.nombre;
                productos[num].descripcion = req.body.descripcion;
                productos[num].codigo = req.body.codigo;
                productos[num].precio = req.body.precio;
                productos[num].stock = req.body.stock;
                fs.writeFileSync("./files/productos.txt",JSON.stringify(productos , null,2));
            };
            res.json({
            mensaje: 'Producto actualizado',
            });
        }
    })

app.use("/producto",routerProductos)


//**********************  Carrito ****************/  
routerCarrito.get("/",async(req,res)=>{
    const Carrito = await carritoService.getAll();
    console.log(Carrito)
    res.json({
        Carrito
    })
})
   
   routerCarrito.post("/",async(req,res)=>{
      let car = req.body;
      const carrito = await carritoService.getAll();
      let id = carrito.length+1
      car.id = id;
      console.log(req.body)
      carrito.push(car);
      console.log(car);
      fs.writeFileSync("./files/carrito.txt",JSON.stringify(carrito, null,2));
      res.json({
           msg : 'Se agrego al carrito',
           Id : id
          })
      })
   
      routerCarrito.get("/:id",async(req,res)=>{
       let indice = req.params.id;
       const carrito = await carritoService.getAll();
       let carFilter = carrito.filter(p => p.id ==indice)
   
       if((carFilter == undefined) || carFilter.length == 0 ){
           res.json({
            error: 'Producto no encontrado en el carrito.'
           })
          }else{
           res.json({carFilter})
          }
      })
   
      routerCarrito.delete("/:id",async(req,res)=>{
       let indice = req.params.id ;
       const carrito = await carritoService.getAll();
       let carFilter = carrito.filter(p => p.id !=indice)
       if((carFilter == undefined) || carFilter.length == 0 ){
           res.json({
            error: 'Producto no encontrado en el carrito'
           })
          }else{
            fs.writeFileSync("./files/carrito.txt",JSON.stringify(carFilter , null,2));
           res.json({carFilter})
          }
      })
   
      routerCarrito.put("/",async(req,res)=>{
       if(!req.body.timestamp || !req.body.productos || !req.body.id) {
           res.json({
            error: true,
            codigo: 502,
            mensaje: 'El campo timestamp, productos y id son requeridos'
           });
          } else {
               if(req.body.timestamp=== '' || req.body.productos === '' || req.body.id=== '') {
                   res.json({
                       error: true,
                       codigo: 501,
                       mensaje: 'Hay campos vacios'
               });
               } else {
                   let num = parseInt(req.body.id) - 1
                   const carrito = await carritoService.getAll();
                   carrito[num].timestamp = req.body.timestamp;
                   carrito[num].productos = req.body.productos;

                   fs.writeFileSync("./files/carrito.txt",JSON.stringify(carrito, null,2));
               };
               res.json({
               mensaje: 'Carrito actualizado',
               });
           }
       })

app.use("/carrito",routerCarrito)




