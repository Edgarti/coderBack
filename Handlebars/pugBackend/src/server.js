const express = require('express');
const app = express();
app.listen(8080,()=>console.log("server listening on port 8080"));

 const Contenedor = require("./contenedorProductos");

 const productsService = new Contenedor("productos.txt");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(__dirname+"/public"));

 // __dirname  donde esta views  es src
app.set("views", __dirname + "/views");

app.set("view engine", "pug");


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

app.post("/productos",async(req,res)=>{
 
    //obtengo la info del formulario, y la guardo en una variable
     const newProduct = req.body;
     //console.log(newProduct);
     await productsService.save(newProduct);
      console.log(newProduct);
     res.redirect("/");
  
})