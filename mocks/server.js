import express from "express"
import {faker} from "@faker-js/faker"
import handlebars from "express-handlebars"
import path from "path"

const app = express();
app.listen(8080,()=>console.log("server listening on port 8080"));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//vamos a inicializar nuestro motor de plantillas.
app.engine("handlebars",handlebars.engine());

//donde tengo las vistas en mi proyecto
app.set("views", "./views")

//que motor de plantillas voy a utilizar
app.set("view engine", "handlebars");

const  {commerce,image} = faker;
 
app.get("/productos", (req,res)=>{
    // let hola="hola"
    // res.send(hola);
    let listProductos = [];
    
    for(let i=1; i<10;i++)
    {
        listProductos.push(
           { id :i,
            nombre : commerce.productName(),
            price : commerce.price(),
            url : image.food()
        }
        )

    }
    res.render("productos", {
        listProductos
    })
    
});