//importaciones
import express from "express";
import handlebars from "express-handlebars";
import nodemon from "nodemon";
import { dirname } from "path";
import {fileURLToPath} from "url"; 
import process from 'node:process';
import {config} from "./config.js";
import parseArg from "minimist";


const argument = parseArg(process.argv.slice(2));
console.log(argument);
//servidor express
const app = express();
const PORT = config.PORT || 8080;
app.listen(PORT, ()=>console.log(`Server listening on port ${PORT}`));


//archivos estaticos
const __dirname = dirname(fileURLToPath(import.meta.url)); //ruta server.js
app.use(express.static(__dirname+"/public"));//ruta carpeta public


//motor de plantilla
//inicializar el motor de plantillas
app.engine(".hbs",handlebars.engine({extname: '.hbs'}));
//ruta de las vistas
app.set("views", __dirname+"/views");
//vinculacion del motor a express
app.set("view engine", ".hbs");


//interpretacion de formato json desde el cliente
app.use(express.json()); //lectura de json desde el cuerpo de la peticion.
app.use(express.urlencoded({extended:true})); //lectura de json desde un metodo post de formulario





//rutas asociadas a las paginas del sitio web
app.get("/",(req,res)=>{
    res.render("home")
});

app.get("/info",(req,res)=>{
    res.send({"Argumento de entrada":"",
    "Sistema operativo":process.platform,
    "Version de node":process.version,
    "Memoria total":process.memoryUsage(),
    "Path de ejecucion":process.execPath,
    "proceso id":process.getegid,
    "carpeta del proyecto":process.cwd(),
    })
});

app.get("/randoms",(req,res)=>{
    res.render("randoms")
});

