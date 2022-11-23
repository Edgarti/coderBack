const express = require('express');
const handlebars = require("express-handlebars");
const path = require("path");
const Contenedor = require("./contenedorProductos");
const {Server} = require("socket.io")

const productsService = new Contenedor("productos.txt");
const viewsFolder = path.join(__dirname,"views")
// console.log(viewsFolder);

const app = express();
const server = app.listen(8080,()=>console.log("server listening on port 8080"));

app.use(express.static(__dirname+"/public"));

//middlewares para interpretar la info que llega en formato json a traves de una solicitud
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//vamos a inicializar nuestro motor de plantillas.
app.engine("handlebars",handlebars.engine());

//donde tengo las vistas en mi proyecto
app.set("views", viewsFolder);

//que motor de plantillas voy a utilizar
app.set("view engine", "handlebars");

//configurar socket.io
const io = new Server(server);

const chat = [{autor: "pedro", text :"Hola men "},
{autor: "pablo", text :"Bien pedro como estas..?? "},
{autor: "Nancy", text :"Chicos como estan..? "}
]

io.on("connection",async(socket)=>{
        console.log("nuevo cliente conectado");
        //Cuando se conecte recibe todos los productos 
        socket.emit("listProdutosFront",await productsService.getAll());
        socket.emit("msgChat",chat)
        socket.on("newProductos",async(data)=>{
          await  productsService.save(data);
          const listActProdutos = await productsService.getAll();
          io.sockets.emit("listProdutosFront",await productsService.getAll())
          
        })

        //enviar los mensajes al cliente
        socket.emit("mesgChat", chat);
    
        // //recibimos el mensaje
        socket.on("newMsg", (data)=>{
           chat.push(data);
            //enviamos los mensajes a todos los sockets que esten conectados.
            io.sockets.emit("messagesChat",chat)
        })
    });

//rutas de las vistas
app.get("/",(req,res)=>{
    res.render("home")
})

app.get("/productos", async(req,res)=>{
    console.log("todos los productos")
    const productos = await productsService.getAll();
    console.log(productos)
    res.render("productos", {
        productos
    })
})

app.post("/products",async(req,res)=>{
    
    //obtengo la info del formulario, y la guardo en una variable
     const newProduct = req.body;
     await productsService.save(newProduct);
     console.log(newProduct);
     res.redirect("/");
  
})

// configuras socket npm i socket.io


//detectar cada socket de un cliente que se conecte
